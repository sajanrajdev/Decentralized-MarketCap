import { ethers } from 'ethers'

class UncheckedJsonRpcSigner extends ethers.Signer {
  constructor(signer: any) {
    super()
    ethers.utils.defineReadOnly(this, 'signer', signer)
    ethers.utils.defineReadOnly(this, 'provider', signer.provider)
  }

  getAddress() {
    return this.signer.getAddress()
  }

  sendTransaction(transaction: any) {
    return this.signer.sendUncheckedTransaction(transaction).then((hash: any) => ({
      hash,
      nonce: null,
      gasLimit: null,
      gasPrice: null,
      data: null,
      value: null,
      chainId: null,
      confirmations: 0,
      from: null,
      wait: (confirmations: any) =>
        this.provider.waitForTransaction(hash, confirmations)
    }))
  }
}

function getSigner(provider: any) {
  return new UncheckedJsonRpcSigner(provider.getSigner())
}

export default getSigner
