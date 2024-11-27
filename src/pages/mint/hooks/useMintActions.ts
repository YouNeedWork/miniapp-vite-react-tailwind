import { useCurrentSession, useCurrentAddress, useCreateSessionKey } from '@roochnetwork/rooch-sdk-kit';
import { RoochClient, Transaction, Args, RoochAddress } from '@roochnetwork/rooch-sdk';
import { PKG } from '@/constants/config';

export const useMintActions = () => {
  const client = new RoochClient({ url: 'https://test-seed.rooch.network/' });
  const sessionKey = useCurrentSession();
  const address = useCurrentAddress();
  const { mutateAsync: createSessionKey } = useCreateSessionKey();

  const handleMine = async () => {
    try {
      if (!address) return;

      if (!sessionKey) {
        await createSessionKey({
          appName: 'rooch',
          appUrl: window.location.href,
          scopes: ['0x1::*::*', '0x3::*::*', `${PKG}::*::*`],
          maxInactiveInterval: 60 * 60 * 8,
        });
      }

      const objects = await client.getStates({
        accessPath: `/resource/${address.genRoochAddress().toHexAddress()}/${PKG}::gold_miner::MineInfo`,
        stateOption: { decode: true }
      });

      if (objects.length === 0) {
        const inviter = localStorage.getItem('inviter');
        const txn = new Transaction();

        txn.callFunction({
          address: PKG,
          module: 'gold_miner',
          function: 'start',
          args: [
            inviter === null 
              ? Args.address(new RoochAddress('0x0000000000000000000000000000000000000000000000000000000000000000').toStr()) 
              : Args.address(inviter)
          ],
          typeArgs: [],
        });

        const result = await client.signAndExecuteTransaction({
          transaction: txn,
          signer: sessionKey as any,
        });

        if (result.execution_info.status.type !== 'executed') {
          throw new Error('Failed to start mining');
        }
      } else {
        const txn = new Transaction();
        txn.callFunction({
          address: PKG,
          module: 'gold_miner',
          function: 'mine',
          args: [],
          typeArgs: [],
        });

        const result = await client.signAndExecuteTransaction({
          transaction: txn,
          signer: sessionKey as any,
        });

        return result.execution_info.status.type === 'executed';
      }
    } catch (error) {
      console.error('Mining error:', error);
      throw error;
    }
  };

  return { handleMine };
};