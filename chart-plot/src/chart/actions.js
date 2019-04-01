export default function reinicialize() {
  return dispatch => {
    dispatch([{ type: "REINICIALIZE" }]);
  };
}
