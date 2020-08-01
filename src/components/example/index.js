import React from 'react';
import firebase from '../../services/firebase';

export const SpellInput = ({ spell }) => {
  const [name, setName] = React.useState(spell.name);

  const onUpdate = () => {
    const db = firebase.firestore();
    db.collection('spells')
      .doc(spell.id)
      .set({ ...spell, name });
  };

  const onDelete = () => {
    const db = firebase.firestore();
    db.collection('spells')
      .doc(spell.id)
      .delete();
  };

  return (
    <>
      <input
        value={name}
        onChange={e => {
          setName(e.target.value);
        }}
      />
      <button type="button" onClick={onUpdate}>
        Update
      </button>
      <button type="button" onClick={onDelete}>
        Delete
      </button>
    </>
  );
};
