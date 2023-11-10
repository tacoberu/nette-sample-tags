<?php

namespace App\UI;

use App\Business\TagQuery;


class TagGridFactory
{
	private TagQuery $query;


	function __construct(TagQuery $query)
	{
		$this->query = $query;
	}



	function create()
	{
		$control = new GridControl(new TagGridModel($this->query)
			, __dir__ . '/grid.latte'
			);
		return $control;
	}

}



class TagGridModel implements GridModel
{
	private TagQuery $data;


	function __construct(TagQuery $data)
	{
		$this->data = $data;
	}



	function totalCount(): int
	{
		return $this->data->totalCount();
	}



	function range($sort, int $offset, int $limit): array
	{
		return $this->data->range($sort, $offset, $limit);
	}

}
