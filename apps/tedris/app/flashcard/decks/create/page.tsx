'use client';

import React, { useState } from 'react';
import DeckForm from '../../../../features/flashcards/components/deckForm';
import { Button } from '@madrasah/ui/components/button';

function Page() {
  const [deckName, setDeckName] = useState('');
  const [description, setDescription] = useState('');
  const [cards, setCards] = useState([
    {
      front: '',
      frontNote: '',
      back: '',
      backNote: '',
      categories: '',
      frontLanguage: '',
      backLanguage: '',
      difficulty: '',
    },
  ]);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div>Back</div>
        <Button>Save</Button>
      </div>

      <DeckForm cards={cards} setCards={setCards} deckName={deckName} setDeckName={setDeckName} description={description} setDescription={setDescription} />
    </div>
  );
}

export default Page;
