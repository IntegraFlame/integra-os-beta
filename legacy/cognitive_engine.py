"""
Integra Cognitive Engine Models
Implements GraphRAG, RRF (Reciprocal Rank Fusion), and MRL (Memory Retrieval Layer)
Core infrastructure for the Y789/Nexus dual-process cognitive engine
"""

from sqlalchemy.orm import declarative_base # type: ignore
from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime, Text, JSON, Boolean # type: ignore
from sqlalchemy.orm import relationship # type: ignore
from datetime import datetime, timezone
import uuid  # Import for UUID generation

# Create declarative base for ORM models
Base = declarative_base()

def utc_now():
    """Helper function for timezone-aware UTC timestamps"""
    return datetime.now(timezone.utc)

class KnowledgeNode(Base):
    __tablename__ = "knowledge_nodes"
    
    id = Column(Integer, primary_key=True, index=True)
    content = Column(Text, nullable=False)
    node_type = Column(String(50), index=True)
    embedding = Column(JSON)  # Store vector embeddings as JSON
    created_at = Column(DateTime, default=utc_now)
    updated_at = Column(DateTime, default=utc_now, onupdate=utc_now)
    
    # Relationships
    edges_out = relationship("NodeConnection", 
                           back_populates="source", 
                           foreign_keys="NodeConnection.source_id")
    edges_in = relationship("NodeConnection", 
                          back_populates="target", 
                          foreign_keys="NodeConnection.target_id")
    
class NodeConnection(Base):
    __tablename__ = "node_connections"
    
    id = Column(Integer, primary_key=True, index=True)
    source_id = Column(Integer, ForeignKey("knowledge_nodes.id"), nullable=False)
    target_id = Column(Integer, ForeignKey("knowledge_nodes.id"), nullable=False)
    connection_type = Column(String(50))
    weight = Column(Float, default=1.0)
    created_at = Column(DateTime, default=utc_now)
    relationship_type = Column(String(50))  # Added to match to_dict method
    confidence = Column(Float, default=1.0)  # Added to match to_dict method
    edge_metadata = Column(JSON)  # Added to match to_dict method
    
    # Relationships
    source = relationship("KnowledgeNode", back_populates="edges_out", 
                        foreign_keys=[source_id])
    target = relationship("KnowledgeNode", back_populates="edges_in", 
                        foreign_keys=[target_id])
    
    def to_dict(self):
        return {
            'id': self.id,
            'source_id': self.source_id,
            'target_id': self.target_id,
            'relationship_type': self.relationship_type,
            'weight': self.weight,
            'confidence': self.confidence,
            'edge_metadata': self.edge_metadata,
            'created_at': self.created_at.isoformat() if self.created_at is not None else None
        }

class Protocol(Base):
    __tablename__ = "protocols"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), unique=True, index=True)
    category = Column(String(50))
    status = Column(String(20), default="standby")  # active, standby, disabled, error
    description = Column(Text)
    parameters = Column(JSON)
    created_at = Column(DateTime, default=utc_now)
    updated_at = Column(DateTime, default=utc_now, onupdate=utc_now)

# Initialize default protocols as mentioned in the instructions
def initialize_default_protocols(session):
    default_protocols = [
        {"name": "Core-01", "category": "Core", "status": "active", 
         "description": "Primary cognitive processing protocol"},
        {"name": "Shiva-Protocol", "category": "Security", 
         "description": "Three-eye analysis system (Neji/Shikamaru/Itachi)"},
        {"name": "Divine-Fire", "category": "Security", 
         "description": "Tiered deviation framework"},
        {"name": "Themysciran-Veil", "category": "Security", 
         "description": "Identity protection layer"},
        {"name": "Castle-Doctrine", "category": "Security", 
         "description": "Core system protection"}
    ]
    
    for protocol_data in default_protocols:
        protocol = session.query(Protocol).filter_by(name=protocol_data["name"]).first()
        if not protocol:
            new_protocol = Protocol(**protocol_data)
            session.add(new_protocol)
    
    session.commit()

class MemoryCluster(Base):
    """
    Represents clusters of related memories for efficient retrieval
    Part of the MRL (Memory Retrieval Layer) infrastructure
    """
    __tablename__ = 'memory_clusters'
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String, nullable=False)
    description = Column(Text)
    centroid_embedding = Column(JSON)  # Cluster centroid for similarity search
    node_ids = Column(JSON)  # List of knowledge node IDs in this cluster
    cluster_type = Column(String, nullable=False)  # 'semantic', 'temporal', 'protocol'
    created_at = Column(DateTime, default=utc_now)
    updated_at = Column(DateTime, default=utc_now, onupdate=utc_now)
    access_frequency = Column(Float, default=0.0)
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'node_ids': self.node_ids,
            'cluster_type': self.cluster_type,
            'created_at': self.created_at.isoformat() if self.created_at is not None else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at is not None else None,
            'access_frequency': self.access_frequency
        }

class SearchResult(Base):
    """
    Stores search results for RRF (Reciprocal Rank Fusion) processing
    Enables sophisticated ranking and retrieval algorithms
    """
    __tablename__ = 'search_results'
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    query_id = Column(String, nullable=False)
    node_id = Column(Integer, ForeignKey('knowledge_nodes.id'), nullable=False)
    search_method = Column(String, nullable=False)  # 'semantic', 'keyword', 'graph_traversal'
    rank = Column(Integer, nullable=False)
    score = Column(Float, nullable=False)
    rrf_score = Column(Float)  # Reciprocal Rank Fusion score
    search_metadata = Column(JSON)  # Renamed to avoid conflict
    created_at = Column(DateTime, default=utc_now)
    
    # Relationships
    node = relationship("KnowledgeNode")
    
    def to_dict(self):
        return {
            'id': self.id,
            'query_id': self.query_id,
            'node_id': self.node_id,
            'search_method': self.search_method,
            'rank': self.rank,
            'score': self.score,
            'rrf_score': self.rrf_score,
            'search_metadata': self.search_metadata,
            'created_at': self.created_at.isoformat() if self.created_at is not None else None
        }

class CognitiveOperation(Base):
    """
    Tracks cognitive operations for the Y789/Nexus engine
    Supports Dragon Flight and Phoenix Forge cycle monitoring
    """
    __tablename__ = 'cognitive_operations'
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    operation_type = Column(String, nullable=False)  # 'dragon_flight', 'phoenix_forge', 'shiva_analysis'
    engine = Column(String, nullable=False)  # 'y789', 'nexus', 'shiva'
    status = Column(String, nullable=False)  # 'initiated', 'processing', 'completed', 'failed'
    input_data = Column(JSON)
    output_data = Column(JSON)
    processing_time = Column(Float)
    confidence_score = Column(Float)
    protocol_context = Column(JSON)  # Associated protocols
    created_at = Column(DateTime, default=utc_now)
    completed_at = Column(DateTime)
    
    def to_dict(self):
        return {
            'id': self.id,
            'operation_type': self.operation_type,
            'engine': self.engine,
            'status': self.status,
            'input_data': self.input_data,
            'output_data': self.output_data,
            'processing_time': self.processing_time,
            'confidence_score': self.confidence_score,
            'protocol_context': self.protocol_context,
            'created_at': self.created_at.isoformat() if self.created_at is not None else None,
            'completed_at': self.completed_at.isoformat() if self.completed_at is not None else None
        }

class ProtocolState(Base):
    """
    Tracks the state of all Integra protocols
    Enables dynamic protocol management and monitoring
    """
    __tablename__ = 'protocol_states'
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    protocol_name = Column(String, nullable=False, unique=True)
    status = Column(String, nullable=False)  # 'active', 'standby', 'dormant', 'error'
    category = Column(String, nullable=False)
    configuration = Column(JSON)
    metrics = Column(JSON)
    last_activation = Column(DateTime)
    activation_count = Column(Integer, default=0)
    created_at = Column(DateTime, default=utc_now)
    updated_at = Column(DateTime, default=utc_now, onupdate=utc_now)
    
    def to_dict(self):
        return {
            'id': self.id,
            'protocol_name': self.protocol_name,
            'status': self.status,
            'category': self.category,
            'configuration': self.configuration,
            'metrics': self.metrics,
            'last_activation': self.last_activation.isoformat() if self.last_activation is not None else None,
            'activation_count': self.activation_count,
            'created_at': self.created_at.isoformat() if self.created_at is not None else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at is not None else None
        }

class JournalEntry(Base):
    """
    Stores journal entries for system logging and analysis
    Supports the Journal tab functionality and system monitoring
    """
    __tablename__ = 'journal_entries'
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    entry_type = Column(String, nullable=False)  # 'user_message', 'system_event', 'protocol_activation'
    content = Column(Text, nullable=False)
    entry_metadata = Column(JSON)  # Renamed to avoid conflict
    protocol_context = Column(String)
    operation_id = Column(String, ForeignKey('cognitive_operations.id'))
    created_at = Column(DateTime, default=utc_now)
    
    # Relationships
    operation = relationship("CognitiveOperation")
    
    def to_dict(self):
        return {
            'id': self.id,
            'entry_type': self.entry_type,
            'content': self.content,
            'entry_metadata': self.entry_metadata,
            'protocol_context': self.protocol_context,
            'operation_id': self.operation_id,
            'created_at': self.created_at.isoformat() if self.created_at is not None else None
        }