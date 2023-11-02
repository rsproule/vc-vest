import {
  useContractRead,
  UseContractReadConfig,
  useContractWrite,
  Address,
  UseContractWriteConfig,
  usePrepareContractWrite,
  UsePrepareContractWriteConfig,
  useContractEvent,
  UseContractEventConfig,
} from 'wagmi'
import {
  ReadContractResult,
  WriteContractMode,
  PrepareWriteContractResult,
} from 'wagmi/actions'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Vesting
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xca002A2Fdd1ad60FB1bBd2aEF4b32FA62da6d87D)
 */
export const vestingABI = [
  {
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [
      { name: 'newOwner', internalType: 'address', type: 'address' },
      { name: 'xyzTokenAddress', internalType: 'address', type: 'address' },
      { name: 'startTime', internalType: 'uint256', type: 'uint256' },
      { name: 'totalBalance', internalType: 'uint256', type: 'uint256' },
    ],
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  { stateMutability: 'nonpayable', type: 'fallback' },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'EPOCH_DURATION',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'NUMBER_OF_EPOCHS',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'balance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'claim',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'getCurrentEpoch',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'lastClaimedEpoch',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'totalDistributedBalance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
  },
] as const

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xca002A2Fdd1ad60FB1bBd2aEF4b32FA62da6d87D)
 */
export const vestingAddress = {
  1: '0xca002A2Fdd1ad60FB1bBd2aEF4b32FA62da6d87D',
} as const

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xca002A2Fdd1ad60FB1bBd2aEF4b32FA62da6d87D)
 */
export const vestingConfig = {
  address: vestingAddress,
  abi: vestingABI,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// VestingWallet
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xF5E4f8e6F4eD07c2854a315332B883Dac49b2575)
 */
export const vestingWalletABI = [
  { stateMutability: 'nonpayable', type: 'constructor', inputs: [] },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousAdmin',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'newAdmin',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'AdminChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'beacon',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'BeaconUpgraded',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'token',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'TokensReleased',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'implementation',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'Upgraded',
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'beneficiary',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'cliff',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'token', internalType: 'address', type: 'address' },
      { name: 'delegatee', internalType: 'address', type: 'address' },
    ],
    name: 'delegate',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'duration',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'beneficiary_', internalType: 'address', type: 'address' },
      { name: 'admin_', internalType: 'address', type: 'address' },
      { name: 'start_', internalType: 'uint256', type: 'uint256' },
      { name: 'cliff_', internalType: 'uint256', type: 'uint256' },
      { name: 'duration_', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'initialize',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'token', internalType: 'address', type: 'address' }],
    name: 'release',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'token', internalType: 'address', type: 'address' }],
    name: 'released',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'start',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'newImplementation', internalType: 'address', type: 'address' },
    ],
    name: 'upgradeTo',
    outputs: [],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'newImplementation', internalType: 'address', type: 'address' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'upgradeToAndCall',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'token', internalType: 'address', type: 'address' },
      { name: 'timestamp', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'vestedAmount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
] as const

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xF5E4f8e6F4eD07c2854a315332B883Dac49b2575)
 */
export const vestingWalletAddress = {
  1: '0xF5E4f8e6F4eD07c2854a315332B883Dac49b2575',
} as const

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xF5E4f8e6F4eD07c2854a315332B883Dac49b2575)
 */
export const vestingWalletConfig = {
  address: vestingWalletAddress,
  abi: vestingWalletABI,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// erc20
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const erc20ABI = [
  {
    type: 'event',
    inputs: [
      { name: 'owner', type: 'address', indexed: true },
      { name: 'spender', type: 'address', indexed: true },
      { name: 'value', type: 'uint256', indexed: false },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    inputs: [
      { name: 'from', type: 'address', indexed: true },
      { name: 'to', type: 'address', indexed: true },
      { name: 'value', type: 'uint256', indexed: false },
    ],
    name: 'Transfer',
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'owner', type: 'address' },
      { name: 'spender', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'spender', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'account', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', type: 'uint8' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'recipient', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'sender', type: 'address' },
      { name: 'recipient', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', type: 'bool' }],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link vestingABI}__.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xca002A2Fdd1ad60FB1bBd2aEF4b32FA62da6d87D)
 */
export function useVestingRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof vestingABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof vestingABI, TFunctionName, TSelectData>,
    'abi' | 'address'
  > & { chainId?: keyof typeof vestingAddress } = {} as any,
) {
  return useContractRead({
    abi: vestingABI,
    address: vestingAddress[1],
    ...config,
  } as UseContractReadConfig<typeof vestingABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link vestingABI}__ and `functionName` set to `"EPOCH_DURATION"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xca002A2Fdd1ad60FB1bBd2aEF4b32FA62da6d87D)
 */
export function useVestingEpochDuration<
  TFunctionName extends 'EPOCH_DURATION',
  TSelectData = ReadContractResult<typeof vestingABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof vestingABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof vestingAddress } = {} as any,
) {
  return useContractRead({
    abi: vestingABI,
    address: vestingAddress[1],
    functionName: 'EPOCH_DURATION',
    ...config,
  } as UseContractReadConfig<typeof vestingABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link vestingABI}__ and `functionName` set to `"NUMBER_OF_EPOCHS"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xca002A2Fdd1ad60FB1bBd2aEF4b32FA62da6d87D)
 */
export function useVestingNumberOfEpochs<
  TFunctionName extends 'NUMBER_OF_EPOCHS',
  TSelectData = ReadContractResult<typeof vestingABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof vestingABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof vestingAddress } = {} as any,
) {
  return useContractRead({
    abi: vestingABI,
    address: vestingAddress[1],
    functionName: 'NUMBER_OF_EPOCHS',
    ...config,
  } as UseContractReadConfig<typeof vestingABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link vestingABI}__ and `functionName` set to `"balance"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xca002A2Fdd1ad60FB1bBd2aEF4b32FA62da6d87D)
 */
export function useVestingBalance<
  TFunctionName extends 'balance',
  TSelectData = ReadContractResult<typeof vestingABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof vestingABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof vestingAddress } = {} as any,
) {
  return useContractRead({
    abi: vestingABI,
    address: vestingAddress[1],
    functionName: 'balance',
    ...config,
  } as UseContractReadConfig<typeof vestingABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link vestingABI}__ and `functionName` set to `"getCurrentEpoch"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xca002A2Fdd1ad60FB1bBd2aEF4b32FA62da6d87D)
 */
export function useVestingGetCurrentEpoch<
  TFunctionName extends 'getCurrentEpoch',
  TSelectData = ReadContractResult<typeof vestingABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof vestingABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof vestingAddress } = {} as any,
) {
  return useContractRead({
    abi: vestingABI,
    address: vestingAddress[1],
    functionName: 'getCurrentEpoch',
    ...config,
  } as UseContractReadConfig<typeof vestingABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link vestingABI}__ and `functionName` set to `"lastClaimedEpoch"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xca002A2Fdd1ad60FB1bBd2aEF4b32FA62da6d87D)
 */
export function useVestingLastClaimedEpoch<
  TFunctionName extends 'lastClaimedEpoch',
  TSelectData = ReadContractResult<typeof vestingABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof vestingABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof vestingAddress } = {} as any,
) {
  return useContractRead({
    abi: vestingABI,
    address: vestingAddress[1],
    functionName: 'lastClaimedEpoch',
    ...config,
  } as UseContractReadConfig<typeof vestingABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link vestingABI}__ and `functionName` set to `"owner"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xca002A2Fdd1ad60FB1bBd2aEF4b32FA62da6d87D)
 */
export function useVestingOwner<
  TFunctionName extends 'owner',
  TSelectData = ReadContractResult<typeof vestingABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof vestingABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof vestingAddress } = {} as any,
) {
  return useContractRead({
    abi: vestingABI,
    address: vestingAddress[1],
    functionName: 'owner',
    ...config,
  } as UseContractReadConfig<typeof vestingABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link vestingABI}__ and `functionName` set to `"totalDistributedBalance"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xca002A2Fdd1ad60FB1bBd2aEF4b32FA62da6d87D)
 */
export function useVestingTotalDistributedBalance<
  TFunctionName extends 'totalDistributedBalance',
  TSelectData = ReadContractResult<typeof vestingABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof vestingABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof vestingAddress } = {} as any,
) {
  return useContractRead({
    abi: vestingABI,
    address: vestingAddress[1],
    functionName: 'totalDistributedBalance',
    ...config,
  } as UseContractReadConfig<typeof vestingABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link vestingABI}__.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xca002A2Fdd1ad60FB1bBd2aEF4b32FA62da6d87D)
 */
export function useVestingWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof vestingAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof vestingABI, string>['request']['abi'],
        TFunctionName,
        TMode
      > & { address?: Address; chainId?: TChainId }
    : UseContractWriteConfig<typeof vestingABI, TFunctionName, TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
      } = {} as any,
) {
  return useContractWrite<typeof vestingABI, TFunctionName, TMode>({
    abi: vestingABI,
    address: vestingAddress[1],
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link vestingABI}__ and `functionName` set to `"claim"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xca002A2Fdd1ad60FB1bBd2aEF4b32FA62da6d87D)
 */
export function useVestingClaim<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof vestingAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof vestingABI,
          'claim'
        >['request']['abi'],
        'claim',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'claim' }
    : UseContractWriteConfig<typeof vestingABI, 'claim', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'claim'
      } = {} as any,
) {
  return useContractWrite<typeof vestingABI, 'claim', TMode>({
    abi: vestingABI,
    address: vestingAddress[1],
    functionName: 'claim',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link vestingABI}__ and `functionName` set to `"renounceOwnership"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xca002A2Fdd1ad60FB1bBd2aEF4b32FA62da6d87D)
 */
export function useVestingRenounceOwnership<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof vestingAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof vestingABI,
          'renounceOwnership'
        >['request']['abi'],
        'renounceOwnership',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'renounceOwnership'
      }
    : UseContractWriteConfig<typeof vestingABI, 'renounceOwnership', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'renounceOwnership'
      } = {} as any,
) {
  return useContractWrite<typeof vestingABI, 'renounceOwnership', TMode>({
    abi: vestingABI,
    address: vestingAddress[1],
    functionName: 'renounceOwnership',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link vestingABI}__ and `functionName` set to `"transferOwnership"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xca002A2Fdd1ad60FB1bBd2aEF4b32FA62da6d87D)
 */
export function useVestingTransferOwnership<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof vestingAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof vestingABI,
          'transferOwnership'
        >['request']['abi'],
        'transferOwnership',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'transferOwnership'
      }
    : UseContractWriteConfig<typeof vestingABI, 'transferOwnership', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'transferOwnership'
      } = {} as any,
) {
  return useContractWrite<typeof vestingABI, 'transferOwnership', TMode>({
    abi: vestingABI,
    address: vestingAddress[1],
    functionName: 'transferOwnership',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link vestingABI}__.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xca002A2Fdd1ad60FB1bBd2aEF4b32FA62da6d87D)
 */
export function usePrepareVestingWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof vestingABI, TFunctionName>,
    'abi' | 'address'
  > & { chainId?: keyof typeof vestingAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: vestingABI,
    address: vestingAddress[1],
    ...config,
  } as UsePrepareContractWriteConfig<typeof vestingABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link vestingABI}__ and `functionName` set to `"claim"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xca002A2Fdd1ad60FB1bBd2aEF4b32FA62da6d87D)
 */
export function usePrepareVestingClaim(
  config: Omit<
    UsePrepareContractWriteConfig<typeof vestingABI, 'claim'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof vestingAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: vestingABI,
    address: vestingAddress[1],
    functionName: 'claim',
    ...config,
  } as UsePrepareContractWriteConfig<typeof vestingABI, 'claim'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link vestingABI}__ and `functionName` set to `"renounceOwnership"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xca002A2Fdd1ad60FB1bBd2aEF4b32FA62da6d87D)
 */
export function usePrepareVestingRenounceOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<typeof vestingABI, 'renounceOwnership'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof vestingAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: vestingABI,
    address: vestingAddress[1],
    functionName: 'renounceOwnership',
    ...config,
  } as UsePrepareContractWriteConfig<typeof vestingABI, 'renounceOwnership'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link vestingABI}__ and `functionName` set to `"transferOwnership"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xca002A2Fdd1ad60FB1bBd2aEF4b32FA62da6d87D)
 */
export function usePrepareVestingTransferOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<typeof vestingABI, 'transferOwnership'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof vestingAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: vestingABI,
    address: vestingAddress[1],
    functionName: 'transferOwnership',
    ...config,
  } as UsePrepareContractWriteConfig<typeof vestingABI, 'transferOwnership'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link vestingABI}__.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xca002A2Fdd1ad60FB1bBd2aEF4b32FA62da6d87D)
 */
export function useVestingEvent<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof vestingABI, TEventName>,
    'abi' | 'address'
  > & { chainId?: keyof typeof vestingAddress } = {} as any,
) {
  return useContractEvent({
    abi: vestingABI,
    address: vestingAddress[1],
    ...config,
  } as UseContractEventConfig<typeof vestingABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link vestingABI}__ and `eventName` set to `"OwnershipTransferred"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xca002A2Fdd1ad60FB1bBd2aEF4b32FA62da6d87D)
 */
export function useVestingOwnershipTransferredEvent(
  config: Omit<
    UseContractEventConfig<typeof vestingABI, 'OwnershipTransferred'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof vestingAddress } = {} as any,
) {
  return useContractEvent({
    abi: vestingABI,
    address: vestingAddress[1],
    eventName: 'OwnershipTransferred',
    ...config,
  } as UseContractEventConfig<typeof vestingABI, 'OwnershipTransferred'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link vestingWalletABI}__.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xF5E4f8e6F4eD07c2854a315332B883Dac49b2575)
 */
export function useVestingWalletRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof vestingWalletABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof vestingWalletABI, TFunctionName, TSelectData>,
    'abi' | 'address'
  > & { chainId?: keyof typeof vestingWalletAddress } = {} as any,
) {
  return useContractRead({
    abi: vestingWalletABI,
    address: vestingWalletAddress[1],
    ...config,
  } as UseContractReadConfig<
    typeof vestingWalletABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link vestingWalletABI}__ and `functionName` set to `"beneficiary"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xF5E4f8e6F4eD07c2854a315332B883Dac49b2575)
 */
export function useVestingWalletBeneficiary<
  TFunctionName extends 'beneficiary',
  TSelectData = ReadContractResult<typeof vestingWalletABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof vestingWalletABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof vestingWalletAddress } = {} as any,
) {
  return useContractRead({
    abi: vestingWalletABI,
    address: vestingWalletAddress[1],
    functionName: 'beneficiary',
    ...config,
  } as UseContractReadConfig<
    typeof vestingWalletABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link vestingWalletABI}__ and `functionName` set to `"cliff"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xF5E4f8e6F4eD07c2854a315332B883Dac49b2575)
 */
export function useVestingWalletCliff<
  TFunctionName extends 'cliff',
  TSelectData = ReadContractResult<typeof vestingWalletABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof vestingWalletABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof vestingWalletAddress } = {} as any,
) {
  return useContractRead({
    abi: vestingWalletABI,
    address: vestingWalletAddress[1],
    functionName: 'cliff',
    ...config,
  } as UseContractReadConfig<
    typeof vestingWalletABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link vestingWalletABI}__ and `functionName` set to `"duration"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xF5E4f8e6F4eD07c2854a315332B883Dac49b2575)
 */
export function useVestingWalletDuration<
  TFunctionName extends 'duration',
  TSelectData = ReadContractResult<typeof vestingWalletABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof vestingWalletABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof vestingWalletAddress } = {} as any,
) {
  return useContractRead({
    abi: vestingWalletABI,
    address: vestingWalletAddress[1],
    functionName: 'duration',
    ...config,
  } as UseContractReadConfig<
    typeof vestingWalletABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link vestingWalletABI}__ and `functionName` set to `"owner"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xF5E4f8e6F4eD07c2854a315332B883Dac49b2575)
 */
export function useVestingWalletOwner<
  TFunctionName extends 'owner',
  TSelectData = ReadContractResult<typeof vestingWalletABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof vestingWalletABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof vestingWalletAddress } = {} as any,
) {
  return useContractRead({
    abi: vestingWalletABI,
    address: vestingWalletAddress[1],
    functionName: 'owner',
    ...config,
  } as UseContractReadConfig<
    typeof vestingWalletABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link vestingWalletABI}__ and `functionName` set to `"released"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xF5E4f8e6F4eD07c2854a315332B883Dac49b2575)
 */
export function useVestingWalletReleased<
  TFunctionName extends 'released',
  TSelectData = ReadContractResult<typeof vestingWalletABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof vestingWalletABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof vestingWalletAddress } = {} as any,
) {
  return useContractRead({
    abi: vestingWalletABI,
    address: vestingWalletAddress[1],
    functionName: 'released',
    ...config,
  } as UseContractReadConfig<
    typeof vestingWalletABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link vestingWalletABI}__ and `functionName` set to `"start"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xF5E4f8e6F4eD07c2854a315332B883Dac49b2575)
 */
export function useVestingWalletStart<
  TFunctionName extends 'start',
  TSelectData = ReadContractResult<typeof vestingWalletABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof vestingWalletABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof vestingWalletAddress } = {} as any,
) {
  return useContractRead({
    abi: vestingWalletABI,
    address: vestingWalletAddress[1],
    functionName: 'start',
    ...config,
  } as UseContractReadConfig<
    typeof vestingWalletABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link vestingWalletABI}__ and `functionName` set to `"vestedAmount"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xF5E4f8e6F4eD07c2854a315332B883Dac49b2575)
 */
export function useVestingWalletVestedAmount<
  TFunctionName extends 'vestedAmount',
  TSelectData = ReadContractResult<typeof vestingWalletABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof vestingWalletABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof vestingWalletAddress } = {} as any,
) {
  return useContractRead({
    abi: vestingWalletABI,
    address: vestingWalletAddress[1],
    functionName: 'vestedAmount',
    ...config,
  } as UseContractReadConfig<
    typeof vestingWalletABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link vestingWalletABI}__.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xF5E4f8e6F4eD07c2854a315332B883Dac49b2575)
 */
export function useVestingWalletWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof vestingWalletAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof vestingWalletABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      > & { address?: Address; chainId?: TChainId }
    : UseContractWriteConfig<typeof vestingWalletABI, TFunctionName, TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
      } = {} as any,
) {
  return useContractWrite<typeof vestingWalletABI, TFunctionName, TMode>({
    abi: vestingWalletABI,
    address: vestingWalletAddress[1],
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link vestingWalletABI}__ and `functionName` set to `"delegate"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xF5E4f8e6F4eD07c2854a315332B883Dac49b2575)
 */
export function useVestingWalletDelegate<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof vestingWalletAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof vestingWalletABI,
          'delegate'
        >['request']['abi'],
        'delegate',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'delegate' }
    : UseContractWriteConfig<typeof vestingWalletABI, 'delegate', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'delegate'
      } = {} as any,
) {
  return useContractWrite<typeof vestingWalletABI, 'delegate', TMode>({
    abi: vestingWalletABI,
    address: vestingWalletAddress[1],
    functionName: 'delegate',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link vestingWalletABI}__ and `functionName` set to `"initialize"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xF5E4f8e6F4eD07c2854a315332B883Dac49b2575)
 */
export function useVestingWalletInitialize<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof vestingWalletAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof vestingWalletABI,
          'initialize'
        >['request']['abi'],
        'initialize',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'initialize' }
    : UseContractWriteConfig<typeof vestingWalletABI, 'initialize', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'initialize'
      } = {} as any,
) {
  return useContractWrite<typeof vestingWalletABI, 'initialize', TMode>({
    abi: vestingWalletABI,
    address: vestingWalletAddress[1],
    functionName: 'initialize',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link vestingWalletABI}__ and `functionName` set to `"release"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xF5E4f8e6F4eD07c2854a315332B883Dac49b2575)
 */
export function useVestingWalletRelease<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof vestingWalletAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof vestingWalletABI,
          'release'
        >['request']['abi'],
        'release',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'release' }
    : UseContractWriteConfig<typeof vestingWalletABI, 'release', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'release'
      } = {} as any,
) {
  return useContractWrite<typeof vestingWalletABI, 'release', TMode>({
    abi: vestingWalletABI,
    address: vestingWalletAddress[1],
    functionName: 'release',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link vestingWalletABI}__ and `functionName` set to `"renounceOwnership"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xF5E4f8e6F4eD07c2854a315332B883Dac49b2575)
 */
export function useVestingWalletRenounceOwnership<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof vestingWalletAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof vestingWalletABI,
          'renounceOwnership'
        >['request']['abi'],
        'renounceOwnership',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'renounceOwnership'
      }
    : UseContractWriteConfig<
        typeof vestingWalletABI,
        'renounceOwnership',
        TMode
      > & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'renounceOwnership'
      } = {} as any,
) {
  return useContractWrite<typeof vestingWalletABI, 'renounceOwnership', TMode>({
    abi: vestingWalletABI,
    address: vestingWalletAddress[1],
    functionName: 'renounceOwnership',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link vestingWalletABI}__ and `functionName` set to `"transferOwnership"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xF5E4f8e6F4eD07c2854a315332B883Dac49b2575)
 */
export function useVestingWalletTransferOwnership<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof vestingWalletAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof vestingWalletABI,
          'transferOwnership'
        >['request']['abi'],
        'transferOwnership',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'transferOwnership'
      }
    : UseContractWriteConfig<
        typeof vestingWalletABI,
        'transferOwnership',
        TMode
      > & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'transferOwnership'
      } = {} as any,
) {
  return useContractWrite<typeof vestingWalletABI, 'transferOwnership', TMode>({
    abi: vestingWalletABI,
    address: vestingWalletAddress[1],
    functionName: 'transferOwnership',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link vestingWalletABI}__ and `functionName` set to `"upgradeTo"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xF5E4f8e6F4eD07c2854a315332B883Dac49b2575)
 */
export function useVestingWalletUpgradeTo<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof vestingWalletAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof vestingWalletABI,
          'upgradeTo'
        >['request']['abi'],
        'upgradeTo',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'upgradeTo' }
    : UseContractWriteConfig<typeof vestingWalletABI, 'upgradeTo', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'upgradeTo'
      } = {} as any,
) {
  return useContractWrite<typeof vestingWalletABI, 'upgradeTo', TMode>({
    abi: vestingWalletABI,
    address: vestingWalletAddress[1],
    functionName: 'upgradeTo',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link vestingWalletABI}__ and `functionName` set to `"upgradeToAndCall"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xF5E4f8e6F4eD07c2854a315332B883Dac49b2575)
 */
export function useVestingWalletUpgradeToAndCall<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof vestingWalletAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof vestingWalletABI,
          'upgradeToAndCall'
        >['request']['abi'],
        'upgradeToAndCall',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'upgradeToAndCall'
      }
    : UseContractWriteConfig<
        typeof vestingWalletABI,
        'upgradeToAndCall',
        TMode
      > & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'upgradeToAndCall'
      } = {} as any,
) {
  return useContractWrite<typeof vestingWalletABI, 'upgradeToAndCall', TMode>({
    abi: vestingWalletABI,
    address: vestingWalletAddress[1],
    functionName: 'upgradeToAndCall',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link vestingWalletABI}__.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xF5E4f8e6F4eD07c2854a315332B883Dac49b2575)
 */
export function usePrepareVestingWalletWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof vestingWalletABI, TFunctionName>,
    'abi' | 'address'
  > & { chainId?: keyof typeof vestingWalletAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: vestingWalletABI,
    address: vestingWalletAddress[1],
    ...config,
  } as UsePrepareContractWriteConfig<typeof vestingWalletABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link vestingWalletABI}__ and `functionName` set to `"delegate"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xF5E4f8e6F4eD07c2854a315332B883Dac49b2575)
 */
export function usePrepareVestingWalletDelegate(
  config: Omit<
    UsePrepareContractWriteConfig<typeof vestingWalletABI, 'delegate'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof vestingWalletAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: vestingWalletABI,
    address: vestingWalletAddress[1],
    functionName: 'delegate',
    ...config,
  } as UsePrepareContractWriteConfig<typeof vestingWalletABI, 'delegate'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link vestingWalletABI}__ and `functionName` set to `"initialize"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xF5E4f8e6F4eD07c2854a315332B883Dac49b2575)
 */
export function usePrepareVestingWalletInitialize(
  config: Omit<
    UsePrepareContractWriteConfig<typeof vestingWalletABI, 'initialize'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof vestingWalletAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: vestingWalletABI,
    address: vestingWalletAddress[1],
    functionName: 'initialize',
    ...config,
  } as UsePrepareContractWriteConfig<typeof vestingWalletABI, 'initialize'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link vestingWalletABI}__ and `functionName` set to `"release"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xF5E4f8e6F4eD07c2854a315332B883Dac49b2575)
 */
export function usePrepareVestingWalletRelease(
  config: Omit<
    UsePrepareContractWriteConfig<typeof vestingWalletABI, 'release'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof vestingWalletAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: vestingWalletABI,
    address: vestingWalletAddress[1],
    functionName: 'release',
    ...config,
  } as UsePrepareContractWriteConfig<typeof vestingWalletABI, 'release'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link vestingWalletABI}__ and `functionName` set to `"renounceOwnership"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xF5E4f8e6F4eD07c2854a315332B883Dac49b2575)
 */
export function usePrepareVestingWalletRenounceOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<typeof vestingWalletABI, 'renounceOwnership'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof vestingWalletAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: vestingWalletABI,
    address: vestingWalletAddress[1],
    functionName: 'renounceOwnership',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof vestingWalletABI,
    'renounceOwnership'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link vestingWalletABI}__ and `functionName` set to `"transferOwnership"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xF5E4f8e6F4eD07c2854a315332B883Dac49b2575)
 */
export function usePrepareVestingWalletTransferOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<typeof vestingWalletABI, 'transferOwnership'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof vestingWalletAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: vestingWalletABI,
    address: vestingWalletAddress[1],
    functionName: 'transferOwnership',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof vestingWalletABI,
    'transferOwnership'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link vestingWalletABI}__ and `functionName` set to `"upgradeTo"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xF5E4f8e6F4eD07c2854a315332B883Dac49b2575)
 */
export function usePrepareVestingWalletUpgradeTo(
  config: Omit<
    UsePrepareContractWriteConfig<typeof vestingWalletABI, 'upgradeTo'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof vestingWalletAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: vestingWalletABI,
    address: vestingWalletAddress[1],
    functionName: 'upgradeTo',
    ...config,
  } as UsePrepareContractWriteConfig<typeof vestingWalletABI, 'upgradeTo'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link vestingWalletABI}__ and `functionName` set to `"upgradeToAndCall"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xF5E4f8e6F4eD07c2854a315332B883Dac49b2575)
 */
export function usePrepareVestingWalletUpgradeToAndCall(
  config: Omit<
    UsePrepareContractWriteConfig<typeof vestingWalletABI, 'upgradeToAndCall'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof vestingWalletAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: vestingWalletABI,
    address: vestingWalletAddress[1],
    functionName: 'upgradeToAndCall',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof vestingWalletABI,
    'upgradeToAndCall'
  >)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link vestingWalletABI}__.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xF5E4f8e6F4eD07c2854a315332B883Dac49b2575)
 */
export function useVestingWalletEvent<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof vestingWalletABI, TEventName>,
    'abi' | 'address'
  > & { chainId?: keyof typeof vestingWalletAddress } = {} as any,
) {
  return useContractEvent({
    abi: vestingWalletABI,
    address: vestingWalletAddress[1],
    ...config,
  } as UseContractEventConfig<typeof vestingWalletABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link vestingWalletABI}__ and `eventName` set to `"AdminChanged"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xF5E4f8e6F4eD07c2854a315332B883Dac49b2575)
 */
export function useVestingWalletAdminChangedEvent(
  config: Omit<
    UseContractEventConfig<typeof vestingWalletABI, 'AdminChanged'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof vestingWalletAddress } = {} as any,
) {
  return useContractEvent({
    abi: vestingWalletABI,
    address: vestingWalletAddress[1],
    eventName: 'AdminChanged',
    ...config,
  } as UseContractEventConfig<typeof vestingWalletABI, 'AdminChanged'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link vestingWalletABI}__ and `eventName` set to `"BeaconUpgraded"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xF5E4f8e6F4eD07c2854a315332B883Dac49b2575)
 */
export function useVestingWalletBeaconUpgradedEvent(
  config: Omit<
    UseContractEventConfig<typeof vestingWalletABI, 'BeaconUpgraded'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof vestingWalletAddress } = {} as any,
) {
  return useContractEvent({
    abi: vestingWalletABI,
    address: vestingWalletAddress[1],
    eventName: 'BeaconUpgraded',
    ...config,
  } as UseContractEventConfig<typeof vestingWalletABI, 'BeaconUpgraded'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link vestingWalletABI}__ and `eventName` set to `"OwnershipTransferred"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xF5E4f8e6F4eD07c2854a315332B883Dac49b2575)
 */
export function useVestingWalletOwnershipTransferredEvent(
  config: Omit<
    UseContractEventConfig<typeof vestingWalletABI, 'OwnershipTransferred'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof vestingWalletAddress } = {} as any,
) {
  return useContractEvent({
    abi: vestingWalletABI,
    address: vestingWalletAddress[1],
    eventName: 'OwnershipTransferred',
    ...config,
  } as UseContractEventConfig<typeof vestingWalletABI, 'OwnershipTransferred'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link vestingWalletABI}__ and `eventName` set to `"TokensReleased"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xF5E4f8e6F4eD07c2854a315332B883Dac49b2575)
 */
export function useVestingWalletTokensReleasedEvent(
  config: Omit<
    UseContractEventConfig<typeof vestingWalletABI, 'TokensReleased'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof vestingWalletAddress } = {} as any,
) {
  return useContractEvent({
    abi: vestingWalletABI,
    address: vestingWalletAddress[1],
    eventName: 'TokensReleased',
    ...config,
  } as UseContractEventConfig<typeof vestingWalletABI, 'TokensReleased'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link vestingWalletABI}__ and `eventName` set to `"Upgraded"`.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xF5E4f8e6F4eD07c2854a315332B883Dac49b2575)
 */
export function useVestingWalletUpgradedEvent(
  config: Omit<
    UseContractEventConfig<typeof vestingWalletABI, 'Upgraded'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof vestingWalletAddress } = {} as any,
) {
  return useContractEvent({
    abi: vestingWalletABI,
    address: vestingWalletAddress[1],
    eventName: 'Upgraded',
    ...config,
  } as UseContractEventConfig<typeof vestingWalletABI, 'Upgraded'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc20ABI}__.
 */
export function useErc20Read<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof erc20ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>,
    'abi'
  > = {} as any,
) {
  return useContractRead({ abi: erc20ABI, ...config } as UseContractReadConfig<
    typeof erc20ABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"allowance"`.
 */
export function useErc20Allowance<
  TFunctionName extends 'allowance',
  TSelectData = ReadContractResult<typeof erc20ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc20ABI,
    functionName: 'allowance',
    ...config,
  } as UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"balanceOf"`.
 */
export function useErc20BalanceOf<
  TFunctionName extends 'balanceOf',
  TSelectData = ReadContractResult<typeof erc20ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc20ABI,
    functionName: 'balanceOf',
    ...config,
  } as UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"decimals"`.
 */
export function useErc20Decimals<
  TFunctionName extends 'decimals',
  TSelectData = ReadContractResult<typeof erc20ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc20ABI,
    functionName: 'decimals',
    ...config,
  } as UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"name"`.
 */
export function useErc20Name<
  TFunctionName extends 'name',
  TSelectData = ReadContractResult<typeof erc20ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc20ABI,
    functionName: 'name',
    ...config,
  } as UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"symbol"`.
 */
export function useErc20Symbol<
  TFunctionName extends 'symbol',
  TSelectData = ReadContractResult<typeof erc20ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc20ABI,
    functionName: 'symbol',
    ...config,
  } as UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"totalSupply"`.
 */
export function useErc20TotalSupply<
  TFunctionName extends 'totalSupply',
  TSelectData = ReadContractResult<typeof erc20ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc20ABI,
    functionName: 'totalSupply',
    ...config,
  } as UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc20ABI}__.
 */
export function useErc20Write<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof erc20ABI, string>['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof erc20ABI, TFunctionName, TMode> & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof erc20ABI, TFunctionName, TMode>({
    abi: erc20ABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"approve"`.
 */
export function useErc20Approve<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof erc20ABI,
          'approve'
        >['request']['abi'],
        'approve',
        TMode
      > & { functionName?: 'approve' }
    : UseContractWriteConfig<typeof erc20ABI, 'approve', TMode> & {
        abi?: never
        functionName?: 'approve'
      } = {} as any,
) {
  return useContractWrite<typeof erc20ABI, 'approve', TMode>({
    abi: erc20ABI,
    functionName: 'approve',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"transfer"`.
 */
export function useErc20Transfer<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof erc20ABI,
          'transfer'
        >['request']['abi'],
        'transfer',
        TMode
      > & { functionName?: 'transfer' }
    : UseContractWriteConfig<typeof erc20ABI, 'transfer', TMode> & {
        abi?: never
        functionName?: 'transfer'
      } = {} as any,
) {
  return useContractWrite<typeof erc20ABI, 'transfer', TMode>({
    abi: erc20ABI,
    functionName: 'transfer',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"transferFrom"`.
 */
export function useErc20TransferFrom<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof erc20ABI,
          'transferFrom'
        >['request']['abi'],
        'transferFrom',
        TMode
      > & { functionName?: 'transferFrom' }
    : UseContractWriteConfig<typeof erc20ABI, 'transferFrom', TMode> & {
        abi?: never
        functionName?: 'transferFrom'
      } = {} as any,
) {
  return useContractWrite<typeof erc20ABI, 'transferFrom', TMode>({
    abi: erc20ABI,
    functionName: 'transferFrom',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc20ABI}__.
 */
export function usePrepareErc20Write<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc20ABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc20ABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc20ABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"approve"`.
 */
export function usePrepareErc20Approve(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc20ABI, 'approve'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc20ABI,
    functionName: 'approve',
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc20ABI, 'approve'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"transfer"`.
 */
export function usePrepareErc20Transfer(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc20ABI, 'transfer'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc20ABI,
    functionName: 'transfer',
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc20ABI, 'transfer'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"transferFrom"`.
 */
export function usePrepareErc20TransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc20ABI, 'transferFrom'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc20ABI,
    functionName: 'transferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc20ABI, 'transferFrom'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link erc20ABI}__.
 */
export function useErc20Event<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof erc20ABI, TEventName>,
    'abi'
  > = {} as any,
) {
  return useContractEvent({
    abi: erc20ABI,
    ...config,
  } as UseContractEventConfig<typeof erc20ABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link erc20ABI}__ and `eventName` set to `"Approval"`.
 */
export function useErc20ApprovalEvent(
  config: Omit<
    UseContractEventConfig<typeof erc20ABI, 'Approval'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: erc20ABI,
    eventName: 'Approval',
    ...config,
  } as UseContractEventConfig<typeof erc20ABI, 'Approval'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link erc20ABI}__ and `eventName` set to `"Transfer"`.
 */
export function useErc20TransferEvent(
  config: Omit<
    UseContractEventConfig<typeof erc20ABI, 'Transfer'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: erc20ABI,
    eventName: 'Transfer',
    ...config,
  } as UseContractEventConfig<typeof erc20ABI, 'Transfer'>)
}
