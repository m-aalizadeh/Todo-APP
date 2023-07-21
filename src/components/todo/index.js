import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { handleHideToast, handleShowToast } from "../../redux/uiActions/todo";
import TodoList from "./TodoList";

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ handleHideToast, handleShowToast }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
