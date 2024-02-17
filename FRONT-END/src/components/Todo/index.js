import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { handleHideToast, handleShowToast } from "../../redux/uiActions/todo";
import Todo from "./Todo";

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ handleHideToast, handleShowToast }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Todo);
