<?php

namespace App\UI;

use Nette\Application\UI\Form;
use LogicException;
use App\Business\TagRemoveCommand;
use App\Business\TagOneQuery;


class TagRemoveFactory
{
	const Removed = 'removed';
	const Canceled = 'canceled';


	private TagRemoveCommand $persistence;
	private TagOneQuery $reader;


	function __construct(TagRemoveCommand $persistence, TagOneQuery $reader)
	{
		$this->persistence = $persistence;
		$this->reader = $reader;
	}



	function create(int $id, $onSuccess)
	{
		$form = new Form();
		$form->addHidden("id", $id);
		$form->addText("name", "Název")
			->setDisabled(True)
			->setOmitted(False);

		$form->addSubmit("send", "Opravdu smazat")
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
						$this->persistence->doRemove($values['id']);
					}
					catch (\Exception $e) {
						$form->addError($e->getMessage());
						return;
					}
					$onSuccess(self::Removed);
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
