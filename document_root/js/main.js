document.addEventListener('DOMContentLoaded', () => {
	naja.initialize();

	M.Modal.init(document.querySelectorAll('.modal'), []);

	/**
	 * Načítání obsahu modálu z remote umístění. Je třeba splnit následující náležitosti:
	 * 1. Na stránce, kde má být modál musí tento být vytvořen s id="remote-modal". Do něho se budou zobrazovat obsahy.
	 * 2. Všechny odkazy, které mají vést do tohoto modálu musí mít třídu "ajax" a nastaven data-target="remote-modal"
	 * 3. Obsah stránky, který se má zobrazovat v modal musí být zabalen do snippetu="modal".
	 * 4. Tento snippet musí být znevalidněn v render metodě: $this->redrawControl('modal').
	 */
	let triggers = document.querySelectorAll('a[data-target="remote-modal"]');
	if (triggers.length) {
		let trigger = triggers[0];
		let target = document.querySelector('#' + trigger.dataset['target']);

		naja.snippetHandler.addEventListener('afterUpdate', (event) => {
			if (event.detail.snippet.id === 'snippet--modal') {
				target.M_Modal.open();
			}
		});
	}
});
