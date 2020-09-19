const options = {
  download: false,
  // selectableRows: 'none',
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
