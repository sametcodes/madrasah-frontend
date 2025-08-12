import React, { Dispatch, SetStateAction } from 'react';

import { Button } from '@madrasah/ui/components/button';
import ATFormGroup from '@madrasah/ui/components/ATFormGroup';
import ATFormGroupTextArea from '@madrasah/ui/components/ATFormGroupTextArea';
import FlashCard from './flashcard';

interface IDeckFormProps {
  cards: any[];
  setCards: Dispatch<SetStateAction<any[]>>;
  deckName: string;
  setDeckName: Dispatch<SetStateAction<string>>;
  description: string;
  setDescription: Dispatch<SetStateAction<string>>;
}

function DeckForm({ cards }: IDeckFormProps) {
  return (
    <>
      <div className="mb-8">
        <h4 className="mb-6">DECK</h4>
        <ATFormGroup id="deckName" label="Deck Name" placeholder="Deck Name" />
        <ATFormGroupTextArea id="description" label="Description" placeholder="Description" />
      </div>

      <div>
        <h4 className="mb-4">CARDS</h4>
        {cards.map((card, index) => (
          <div key={index} className="grid grid-cols-3 gap-4 mb-8">
            <FlashCard>
              <ATFormGroupTextArea id="front" placeholder="Front Text" />
              <ATFormGroupTextArea id="frontNote" placeholder="Front Note" />
            </FlashCard>
            <FlashCard>
              <ATFormGroupTextArea id="back" placeholder="Back Text" />
              <ATFormGroupTextArea id="backNote" placeholder="Back Note" />
            </FlashCard>
            <div className="card-actions">
              <ATFormGroup id="categories" label="Categories" placeholder="hadith abdest abdestin sunnetleri" />
              <ATFormGroup id="frontLanguage" label="Front Card's Language" placeholder="Turkce" />
              <ATFormGroup id="backLanguage" label="Back Card's Language" placeholder="Arapca" />
              <ATFormGroup id="difficulty" label="Difficulty" placeholder="Zorluk" />
            </div>
          </div>
        ))}
        <Button variant="secondary" className="w-full">
          Add Card
        </Button>
      </div>
    </>
  );
}

export default DeckForm;
