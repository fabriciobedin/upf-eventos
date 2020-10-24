const options = {
  download: false,
  filterType: 'dropdown',
  responsive: 'standard',
  fixedHeader: true,
  fixedSelectColumn: true,
  tableBodyHeight: window.innerWidth > 1366 ? '550px' : '450px',

  textLabels: {
    body: {
      noMatch: 'Nenhum registro encontrado',
      toolTip: 'Ordenar',
      columnHeaderTooltip: column => `Ordernar por ${column.label}`
    },
    pagination: {
      next: 'Próxima Página',
      previous: 'Página Anterior',
      rowsPerPage: 'Registros por Página:',
      displayRows: 'de'
    },
    toolbar: {
      search: 'Pesquisar',
      print: 'Imprimir',
      viewColumns: 'Ver Colunas',
      filterTable: 'Filtrar'
    },
    filter: {
      all: 'Tudo',
      title: 'Filtros',
      reset: 'Limpar'
    },
    viewColumns: {
      title: 'Exibir Colunas',
      titleAria: 'Exibir/Ocultar Colunas'
    }
  }
};

export default options;
