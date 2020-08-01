import React from 'react';
import { Wrapper } from './styles';
import firebase from '../../services/firebase';
import { SpellInput } from '../../components/example';

export default function Home() {
  const [spells, setSpells] = React.useState([]);
  const [newSpellName, setNewSpellName] = React.useState();

  React.useEffect(() => {
    const fetchData = async () => {
      const db = firebase.firestore();
      const data = await db.collection('spells').get();
      setSpells(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    };
    fetchData();
  }, []);

  const onCreate = () => {
    const db = firebase.firestore();
    db.collection('spells').add({ name: newSpellName });
  };

  return (
    <Wrapper>
      <h1>Hello World :)</h1>
      <ul>
        <input
          value={newSpellName}
          onChange={e => setNewSpellName(e.target.value)}
        />
        <button type="button" onClick={onCreate}>
          Create
        </button>
        {spells.map(spell => (
          <li key={spell.name}>
            <SpellInput spell={spell} />
          </li>
        ))}
      </ul>
      <button type="button" onClick={() => firebase.auth().signOut()}>
        Sair
      </button>
    </Wrapper>
  );
}
