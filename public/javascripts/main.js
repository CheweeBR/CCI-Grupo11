$(function() {
	'use strict';

	//função buscarMeninas para a tela de Selecao
	async function buscarMeninas() {
		try {
			const response = await fetch('/meninas');
			const meninas = await response.json();

			const tableBody = document.getElementById('table-body');
			tableBody.innerHTML = ''; // Limpa a tabela para sobreescrever

			// Itera sobre os dados obtidos e os adiciona à tabela
			meninas.forEach((menina) => {
				const row = document.createElement('tr');
				row.innerHTML = `
					<td>${menina.nome}</td>
					<td>${menina.idade}</td>
					<td>${menina.cidade} - ${menina.estado}</td>
					<td>R$ ${menina.renda}</td>
				`;
				tableBody.appendChild(row);
			});
		} catch (error) {
			console.error('Erro ao obter meninas:', error);
		}
	}

	// Colocar a página home na main quando entrar no site
	$(document).ready(function () {
		$('main').load('views/home.handlebars');
		
		$('#home').addClass('active');
	});

	// Função para destacar a página em que o usuário escolha entrar e mudar o conteúdo
	$('.nav-menu li').click(function(e) {
	  e.preventDefault();
  
	  // Remova a classe 'active' de todas as <li>
	  $('.nav-menu li').removeClass('active');
  
	  // Adicione a classe 'active' à <li> clicada
	  $(this).addClass('active');
  
	  // Obtenha o valor do id
	  var target = $(this).attr('id');

	  // Carregue o conteúdo da página desejada
	  if(target === 'selecao'){
		$('main').load('views/' + target + '.handlebars', function() {
			buscarMeninas();
		});
	  } else {
		$('main').load('views/' + target + '.handlebars');
	  }
  
	 // Mostrar e esconder a sidebar pelo menu-toggle
	$('.js-menu-toggle').click(function(e) {
	  var $this = $(this);
  
	  if ($('body').hasClass('show-sidebar')) {
		$('body').removeClass('show-sidebar');
		$this.removeClass('active');
	  } else {
		$('body').addClass('show-sidebar');
		$this.addClass('active');
	  }
	});
  
	// Caso clique fora do sidebar, esconde-lo
	$(document).mouseup(function(e) {
	  var container = $(".sidebar");
	  if (!container.is(e.target) && container.has(e.target).length === 0) {
		if ($('body').hasClass('show-sidebar')) {
			$('body').removeClass('show-sidebar');
			$('body').find('.js-menu-toggle').removeClass('active');
		}
	  }
	});
  });
});