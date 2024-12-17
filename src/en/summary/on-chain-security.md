# Introduction to On-Chain Security

## About This Section

Welcome to the final chapter of this tutorial! In previous sections, we learned how to develop and deploy on-chain applications. However, in blockchain development, implementing functionality is only the beginning—**security** is the key to determining whether a project can survive in the long run.

This section will focus on **account security** and **contract security**, introducing common security issues and strategies to address them, helping developers build more secure blockchain applications.

## Account Security

### Mnemonic Storage

Mnemonics are the keys to on-chain assets, and their leakage could result in asset theft. Here are some **not recommended mnemonic storage** methods:

- **Saving as screenshots in the photo gallery**: Photo galleries on phones can be accessed by malicious apps.
- **Storing as files**: Files are susceptible to being scanned by malware.
- **Sharing plaintext via messaging apps like WeChat or other social platforms**: Social platforms carry a risk of data breaches.

**Best Practices**:

- **Write mnemonics down by hand** and keep them in a safe place.
- Store them in hardware-encrypted devices (e.g., hardware wallets).

### Wallets

Wallets are the gateway to the blockchain world, making their security critical.

**Avoid using custodial wallets** whenever possible, as the control of assets rests with a third party, posing risks of platform fraud or hacks. For example, the recent [DEEX user fund theft incident](https://www.panewslab.com/zh/articledetails/7z2fttnq.html) on **2024-11-16** highlights these risks.

Custodial wallets provide convenience. **If you choose to use a custodial wallet, exercise caution, only store small amounts of funds needed for immediate use, and minimize potential risks.**

### Token Approvals

Managing `Token` approvals is a critical aspect of security, as improper approvals may result in assets being maliciously used.

**Problem Scenarios**:

- Users frequently approve **unlimited spending** of `Tokens` for `DApps`, exposing themselves to risk if the `DApp` backend is compromised, leading to malicious asset transfers.

**Best Practices**:

- Regularly revoke unnecessary approvals (you can use [revoke.cash](https://revoke.cash)).
- Opt for approvals with spending limits.

## Contract Security Issues

### Integer Overflow

Since `Solidity` 0.8, integer overflow and underflow checks are enabled by default, and operations revert automatically on overflow. However, improper handling can still cause issues, such as counters failing to increment correctly.

### Access Control

Sensitive operations in contracts must be protected by access control; otherwise, they may lead to security vulnerabilities.

**Problem Scenarios**:

- An upgradeable proxy contract lacks access control, allowing an attacker to reassign the proxy to a malicious contract, resulting in stolen funds.

**Best Practices**:

- Use `Ownable` or `AccessControl` for access control.

### Flash Loan Attacks

Flash loan attacks are a typical on-chain exploit. Attackers leverage the instantaneous borrowing feature of flash loans to manipulate inter-protocol dependencies for illicit gains.

**Example Incident**:

- [2020 bZx Flash Loan Attack](https://www.hellobtc.com/kp/du/02/2699.html): The attacker manipulated a price oracle via a flash loan, causing significant asset loss.

**Best Practices**:

- Be cautious when using price oracles.
- Add anti-reentrancy measures and time restrictions in transaction logic.

### Time Dependency Vulnerabilities

The `block` timestamp in contracts is not entirely reliable, as miners can manipulate it within a certain range.

**Problem Scenarios**:

- In lottery contracts relying on timestamps, miners can predict and manipulate the winning results.

**Best Practices**:

- Avoid using timestamps for critical logic.
- Combine timestamp reliance with other random sources.

## Summary

On-chain security is an essential skill for Ethereum developers. This chapter has covered common risks and strategies for addressing them.

Currently, **Bitcoin may soon break the $100,000 milestone**, signaling growing recognition of blockchain technology's value. Stay updated on blockchain security knowledge and continue learning to be part of this technological wave.

## Additional Resources

- [Solidity Top 10 Common Issues](https://checkmarx.com/blog/solidity-top-10-common-issues/)
- [revoke.cash](https://revoke.cash)
- [What Are Flash Loans in DeFi?](https://academy.binance.com/en/articles/what-are-flash-loans-in-defi)
