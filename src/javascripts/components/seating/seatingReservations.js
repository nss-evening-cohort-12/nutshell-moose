const assignTable = (e) => {
  console.warn('assignTable Called');
  console.warn(e.target.dataset.addReservationId);
  console.warn($(e.target).val());
};

export default { assignTable };
