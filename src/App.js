import { useEffect, useState } from 'react';
import './App.css';
import { deleteBlocker, getBlockers, createBlocker } from './services/blockers';
import { BasicCard } from '../src/components/box';
import { InputForm } from '../src/components/form';


const App = () => {
  const [blockers, setBlockers] = useState([]);
  useEffect(() => {
    getAllBlockers();
  }, [])

  const getAllBlockers = async () => {
    const blockers = await getBlockers();
    setBlockers(blockers);
  }

  const removeBlocker = async (blockerId) => {
    const res = await deleteBlocker(blockerId);
    res && getAllBlockers();
  }

  const addBlocker = async ({ name, blocker, ticket }) => {
    const res = await createBlocker({ name, blocker, ticket });
    res && getAllBlockers();
  }

  const renderBlockers = () => {
    if (blockers.length) {
      return blockers.map((blocker) => {
        return (
          <div>
            <BasicCard
              name={blocker.name}
              blocker={blocker.blocker}
              ticket={blocker.ticket}
              deleteBlocker={() => removeBlocker(blocker._id)}
            />
          </div>
        )
      })
    }
  }
  return (
    <div>
      <h2>Speedy Standup</h2>
      <div style={{ padding: 20 }}>
        <InputForm createBlocker={addBlocker} />
      </div>
      <div style={{ display: "flex", flexFlow: "row wrap", overflow: false, maxWidth: 1200, margin: 'auto', padding: 0 }}>
        {renderBlockers()}
      </div>
    </div>
  );
}

export default App;
