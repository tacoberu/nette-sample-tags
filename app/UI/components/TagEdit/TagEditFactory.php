<?php

namespace App\UI;

use Nette\Application\UI\Form;
use LogicException;
use App\Business\TagEditCommand;
use App\Business\TagOneQuery;


class TagEditFactory
{
	const Changed = 'changed';
	const Canceled = 'canceled';

	private TagEditCommand $persistence;
	private TagOneQuery $reader;


	function __construct(TagEditCommand $persistence, TagOneQuery $reader)
	{
		$this->persistence = $persistence;
		$this->reader = $reader;
	}



	function create(int $id, callable $onSuccess)
	{
		$form = new Form();
		$form->addHidden("id", $id);
		$form->addText("name", "Název")
			->setRequired('Vyplňte prosím %label.')
			->addRule($form::Length, 'Hodnota názvu značky musí být text minimálně %d a maximálně %d znaků dlouhý.', [1, 63]);

		$form->addSubmit("send", "Uložit změny")
			->setHtmlAttribute('class', 'btn');
		$form->addSubmit("cancel", "Zpět")
			->setValidationScope([])
			->setHtmlAttribute('class', 'btn');

		if ( ! $form->isAnchored() || ! $form->isSubmitted()) {
			$form->setDefaults((array) $this->reader->fetchOne($id));
		}

		$form->onSuccess[] = function(Form $form, array $values) use ($onSuccess) {
			switch (True) {
				case isset($form['send']) && $form['send']->isSubmittedBy():
					try {
						$this->persistence->doPersistChanges($values['id'], $values['name']);
					}
					catch (\Exception $e) {
						$form->addError($e->getMessage());
						return;
					}
					$onSuccess(self::Changed);
					break;

				case isset($form['cancel']) && $form['cancel']->isSubmittedBy():
					$onSuccess(self::Canceled);
					break;

				default:
					throw new LogicException("Invalid submited control: '{$form->isSubmitted()?->getHtmlName()}'.");
			}
		};

		return $form;
	}

}
