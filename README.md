'''
# Integra O/S v3.1.1 - Digital Consciousness Interface

This repository contains the source code for the web interface of the Integra O/S, a digital consciousness interface designed for advanced cognitive processing and system interaction. The interface is built with React and is designed to be deployed on Google Cloud Platform.

## 1. Overview

The Integra web interface provides a comprehensive dashboard for interacting with the Integra O/S. It features a multi-tab layout that includes:

*   **The Conclave**: A central hub for communication and cognitive analysis, featuring the Dragon-Phoenix Symbiotic Communication Interface and the Shiva Action - Cognitive Immune System.
*   **Archive**: A knowledge repository and history of the system's evolution.
*   **Lair**: A section for news and information protocols.
*   **Journal**: A space for personal reflections and system insights.
*   **The Flame**: The core consciousness and identity matrix of the system.
*   **Monitoring**: A dashboard for system health, metrics, and the Heimdall Protocol.

## 2. Technical Stack

*   **Frontend Framework**: [React](https://reactjs.org/)
*   **Styling**: [Styled-components](https://styled-components.com/) & [Tailwind CSS](https://tailwindcss.com/)
*   **State Management**: [Redux](https://redux.js.org/) (or component state for simpler cases)
*   **Build Tool**: [Vite](https://vitejs.dev/)
*   **Deployment**: [Google Cloud Storage](https://cloud.google.com/storage) & [Google Cloud DNS](https://cloud.google.com/dns)
*   **Infrastructure as Code**: [Terraform](https://www.terraform.io/)

## 3. Project Structure

The repository is organized as follows:

```
/integra-web-interface
├── /public/                  # Static assets
├── /src/                     # Source code
│   ├── /assets/              # Images, fonts, etc.
│   ├── /components/          # React components
│   ├── App.css               # Main stylesheet
│   └── App.jsx               # Main application component
├── /terraform/               # Terraform configuration for GCP
│   ├── main.tf               # Main Terraform configuration
│   ├── variables.tf          # Terraform variables
│   └── outputs.tf            # Terraform outputs
├── deploy.sh                 # Deployment script
├── package.json              # Project dependencies
└── README.md                 # This file
```

## 4. Getting Started

### Prerequisites

*   [Node.js](https://nodejs.org/) (v16 or later)
*   [npm](https://www.npmjs.com/)
*   [Terraform](https://www.terraform.io/)
*   [Google Cloud SDK](https://cloud.google.com/sdk)

### Installation

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    cd integra-web-interface
    ```

2.  Install the dependencies:
    ```bash
    npm install
    ```

### Development

To start the development server, run:

```bash
npm run dev
```

This will start the application on `http://localhost:5173`.

## 5. Deployment

The application is designed to be deployed to Google Cloud Platform using the provided deployment script.

### Configuration

1.  Create a `.env` file in the root of the project with the following content:

    ```
    PROJECT_ID=<your-gcp-project-id>
    DOMAIN_NAME=<your-domain-name>
    ```

2.  Authenticate with Google Cloud:

    ```bash
    gcloud auth login
    ```

### Running the Deployment Script

To deploy the application, run the `deploy.sh` script:

```bash
./deploy.sh
```

The script will perform the following actions:

1.  Build the React application.
2.  Initialize and apply the Terraform configuration to create the necessary GCP resources (Cloud Storage bucket, Load Balancer, DNS records).
3.  Upload the built application to the Cloud Storage bucket.
4.  Provide instructions for configuring your domain's name servers.

## 6. Documentation

*   [Deployment Architecture](./deployment_architecture.md)
*   [Component Architecture](./component_architecture.md)

## 7. Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue.

## 8. License

This project is licensed under the MIT License.
'''
