# VC Vest

![VC Vest](./assets/vc-vest1.png)

Manage vesting information for a fund that has many token positions.

## The frontend

We have known onchain vesting contracts. This is just a frontend to consolidate all of these into a single page. The idea is that BCAP team members can directly see what is available to claim and actually claim directly from this page.

## Message Bus

We should have some system to push notification to the BCAP slack whenever there are significant vesting events.

## Calendar

Put the vesting events directly in a gmail calendar.

## The main query

Given a wallet address, detect if it is the own of any smart contracts that hold tokens.

Methodology:

Index all the smart contracts

Get all the smart contracts that have "owner", "recipient" or "beneficiary" and persist this value as a key
