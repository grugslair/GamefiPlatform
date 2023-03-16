import { createAsyncThunk } from "@reduxjs/toolkit"
import { ethers } from "ethers"
import { IContractStake } from "store/contractStake/contractStake";
import { useAccount, useContract, useProvider } from "wagmi";
import { claimRocksContractAddress, claimRocksContractABI } from "../../helper/contract";

export const initiateContractClaim = createAsyncThunk(
  'contract/initiateFundingContract',
  async (args, { getState }): Promise<any> => {
    const provider = useProvider();
    const contractClaimRocks = useContract({
      address: claimRocksContractAddress,
      abi: claimRocksContractABI,
      signerOrProvider: provider
    })

    return {
      contract: contractClaimRocks
    }
  } 
)

export const isNFTClaimed = createAsyncThunk(
  'contract/isNFTClaimed',
  async (tokenId, { getState, rejectWithValue }): Promise<any> => {
    const { wallet, contractClaim }: any = getState()

    let createPromiseHasClaim: any = []

    if(wallet.tokenIds.length > 0) {
      wallet.tokenIds.forEach((token: string) => {
        createPromiseHasClaim.push(contractClaim.contract.grugHasClaimed(token))
      })
    }

    const tempResultCheckClaim: any = await Promise.all(createPromiseHasClaim).then(value => {
      return value
    }).catch(error => {
      rejectWithValue(error)
    })

    let result = []

    if(tempResultCheckClaim.length > 0) {
      for(let index = 0; index < wallet.tokenIds.length; index++) {
        result.push({
          tokenId: wallet.tokenIds[index],
          isClaim: tempResultCheckClaim[index]
        })
      }
    }

    const unClaimNft = result.filter(data => data.isClaim === false).sort((current, next) => current.tokenId - next.tokenId)
    const claimedNft = result.filter(data => data.isClaim === true)
    
    return {
      unClaimNft,
      claimedNft
    }
  }
)

export const claimNFT = createAsyncThunk(
  'contract/claimNFT',
  async (amount: string, { getState, rejectWithValue }): Promise<any> => {
    const { address } = useAccount()

    const provider = useProvider()

    const { contractStake, wallet, contractClaim }:any = getState()

    const { gasPrice } = contractStake as IContractStake

    let dataIclaim
    
    let dataToken = []
    
    for(let index = 0; index < parseInt(amount, 10); index++) {
      dataToken.push(contractClaim.unClaimNft[index].tokenId)
    }
  
    
    try {
      const iClaim = new ethers.utils.Interface(claimRocksContractABI)
      // if(amount >= '100000000000000000000000') {
        dataIclaim = iClaim.encodeFunctionData("claim", [dataToken])
      // } else {
      //   dataIrocks = iRocks.encodeFunctionData("approve", [stakeContractAddress, '100000000000000000000000'])
      // }

      const transactionParameters = {
        gasPrice: gasPrice._hex, // customizable by user during MetaMask confirmation.
        to: claimRocksContractAddress, // Required except during contract publications.
        from: address, // must match user's active address.
        value: '0x00', // Only required to send ether to the recipient from the initiating external account.
        data: dataIclaim, // Optional, but used for defining smart contract creation and interaction.
        chainId: '0x5', // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
      };

      // console.log(transactionParameters)

      // const tx = await provider.sendTransaction()


      // const tx = await provider.sendTransaction(transactionParameters)

      // const receipt = await provider.waitForTransaction(tx.hash, 1, 150000)

      return {
        amount,
        receipt
      }

    } catch(err) {
      return rejectWithValue(err)
    }
  }
)
