<?php

namespace App\UI;

use Nette\Application\UI\Form;
use LogicException;
use App\Business\TagCreateCommand;


class TagCreateFactory
{
	const Created = 'created';
	const Canceled = 'canceled';

	private TagCreateCommand $persistence;


	function __construct(TagCreateCommand $persistence)
	{
		$this->persistence = $persistence;
	}



	function create(callable $onSuccess)
	{
		$form = new Form();
		$form->addText("name", "Název")
			->setRequired('Vyplňte prosím %label.')
			->addRule($form::Length, 'Hodnota názvu značky musí být text minimálně %d a maximálně %d znaků dlouhý.', [1, 63]);

		$form->addSubmit("send", "Vytvořit")
			->setHtmlAttribute('class', 'btn');
		$form->addSubmit("cancel", "Zpět")
			->setValidationScope([])
			->setHtmlAttribute('class', 'btn');

		$form->onSuccess[] = function(Form $form, array $values) use ($onSuccess) {
			switch (True) {
				case isset($form['send']) && $form['send']->isSubmittedBy():
					try {
						$this->persistence->doPersistNew($values['name']);
					}
					catch (\Exception $e) {
						$form->addError($e->getMessage());
						return;
					}
					$onSuccess(self::Created);
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
