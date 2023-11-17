<?php

namespace App\Presenters;

use Nette\Application\UI;
use Nette;
use App\UI\TagGridFactory;
use App\UI\TagCreateFactory;
use App\UI\TagEditFactory;
use App\UI\TagRemoveFactory;


class TagPresenter extends UI\Presenter
{
	private TagGridFactory $gridFactory;
	private TagCreateFactory $createFactory;
	private TagEditFactory $editFactory;
	private TagRemoveFactory $removeFactory;


	function __construct(TagGridFactory $gridFactory
		, TagCreateFactory $createFactory
		, TagEditFactory $editFactory
		, TagRemoveFactory $removeFactory
		)
	{
		$this->gridFactory = $gridFactory;
		$this->createFactory = $createFactory;
		$this->editFactory = $editFactory;
		$this->removeFactory = $removeFactory;
	}



	function renderCreate()
	{
		$this->redrawControl('modal');
	}



	function renderRemove(int $id)
	{
		$this->redrawControl('modal');
	}



	function renderEdit(int $id)
	{
	}



	protected function createComponentGrid()
	{
		return $this->gridFactory->create();
	}



	protected function createComponentCreate()
	{
		return $this->createFactory->create(function(string $state) {
			switch ($state) {
				case $this->createFactory::Created:
					$this->flashMessage('Značka byla vytvořena.');
					$this->redirect(':default');
					break;
				case $this->createFactory::Canceled:
					$this->redirect(':default');
					break;
			}
		});
	}



	protected function createComponentEdit()
	{
		return $this->editFactory->create($this->getParameter('id'), function(string $state) {
			switch ($state) {
				case $this->editFactory::Changed:
					$this->flashMessage('Tag byl aktualizován.');
					$this->redirect(':default');
					break;
				case $this->editFactory::Canceled:
					$this->redirect(':default');
					break;
			}
		});
	}



	protected function createComponentRemove()
	{
		return $this->removeFactory->create($this->getParameter('id'), function(string $state) {
			switch ($state) {
				case $this->removeFactory::Removed:
					$this->flashMessage('Tag byl smazán.');
					$this->redirect(':default');
					break;
				case $this->removeFactory::Canceled:
					$this->redirect(':default');
					break;
			}
		});
	}

}
