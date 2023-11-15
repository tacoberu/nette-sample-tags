<?php

namespace App\UI;



interface GridModel
{

	function totalCount(): int;


	function range($sort, int $offset, int $limit): array;

}
