# 🔱 ATLANTIS

**The Premier dApp Discovery Platform on Sui**

ATLANTIS is a decentralized application (dApp) discovery platform built on the Sui blockchain. It provides a curated, community-driven directory of the best dApps in the Sui ecosystem, featuring a distinct Neo-Brutalist design aesthetic.

![ATLANTIS Banner](src/assets/Group%2027.png)

## ✨ Key Features

*   **Neo-Brutalist Design**: A bold, high-contrast, and responsive UI that stands out.
*   **dApp Discovery**: Browse, search, and filter dApps by category (DeFi, Gaming, NFT, Social, etc.).
*   **Live Rankings**: Real-time rankings based on on-chain metrics like Users, Volume, and TVL.
*   **Verified Reviews**: Users can leave on-chain reviews. The system verifies if the reviewer has actually interacted with the dApp's smart contract, awarding a "Verified User" badge.
*   **Decentralized Comments**: A robust comment system where content is stored on **Walrus** (decentralized storage) and references are stored on Sui. Supports threading and rich text.
*   **SuiNS Integration**: Full integration with Sui Name Service. Users' SuiNS names and avatars are displayed throughout the platform.
*   **Mini-App Experience**: Open dApps directly within ATLANTIS in an iframe-based "Mini-App" view for seamless interaction.

## 🛠️ Tech Stack

*   **Frontend**: React, Vite, TypeScript
*   **Styling**: Tailwind CSS (Neo-Brutalist custom theme)
*   **Blockchain**: Sui (Move Smart Contracts)
*   **Storage**: Walrus (for comment content)
*   **Identity**: SuiNS (Sui Name Service)
*   **Wallet**: @mysten/dapp-kit

## 🚀 Getting Started

### Prerequisites

*   Node.js (v18 or later)
*   npm or yarn
*   A Sui Wallet (e.g., Sui Wallet, Ethos)

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/Miracle656/mamiwater.git
    cd mamiwater/mamiwaterf
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Configure Environment**
    Ensure you have the correct network configuration in `src/constants.ts`.
    *   `NETWORK`: 'testnet' or 'mainnet'
    *   `PACKAGE_ID`: The ID of the deployed Move package.
    *   `REGISTRY_ID`: The ID of the shared Registry object.

4.  **Run the development server**
    ```bash
    npm run dev
    ```

5.  **Build for production**
    ```bash
    npm run build
    ```

## 📜 Smart Contracts

The backend logic is powered by Move smart contracts on Sui.
*   **Registry**: Manages the list of dApps.
*   **Reviews**: Handles rating and review logic, including verification.
*   **Comments**: Manages comment threads and links to Walrus blobs.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

---

**Built with 💙 for the Sui Ecosystem**
Powered by **Sui**, **Walrus**, and **SuiNS**.
