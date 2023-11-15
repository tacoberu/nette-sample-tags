<?php

namespace App\UI;

use Nette;
use Nette\Application\UI;
use Nette\Utils\Paginator;



class GridControl extends UI\Control
{
	private $model;
	private $templateFile;

	/**
	 * @persistent
	 */
	public $page = 1;

	/**
	 * items per page
	 * @persistent
	 */
	public $ipp = 10;

	/**
	 * @persistent
	 */
	public $order = Null;


	function __construct(GridModel $model, string $templateFile)
	{
		$this->model = $model;
		$this->templateFile = $templateFile;
	}



	function render()
	{
		$paginator = $this->getPaginator();

		$items = $this->model->range(self::parseOrder($this->order)
			, $paginator->getOffset()
			, $paginator->getItemsPerPage()
			);

		$this->template->items = $items;
		$this->template->order = $this->order;
		$this->template->paginationSteps = $this->getStepsFor($paginator);
		$this->template->paginationItemsPerPage = $this->getItemsPerPageFor();
		$this->template->paginator = $paginator;
		$this->template->setFile($this->templateFile);
		$this->template->render();
	}



	private function getPaginator()
	{
		$paginator = new Nette\Utils\Paginator;
		$paginator->setPage($this->page);
		$paginator->setItemsPerPage($this->ipp);
		$paginator->setItemCount($this->model->totalCount());
		return $paginator;
	}



	private function getStepsFor($paginator, $steps = 4, $surround = 3): array
	{
		$start = max($paginator->getPage() - $steps, 1);
		$end = min($paginator->getPage() + $steps, $paginator->getPageCount());
		return range($start, $end);
	}



	private function getItemsPerPageFor()
	{
		return [
			10, 20, 30,
		];
	}



	private static function parseOrder(?string $val): array
	{
		if (empty($val)) {
			return [];
		}
		list($dir, $col) = explode('-', $val, 2);
		switch($dir) {
			case 'a':
				$dir = 'ASC';
				break;
			case 'v':
				$dir = 'DESC';
				break;
		}
		return [$col => $dir];
	}
}
