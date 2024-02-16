import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { handleHideToast, handleShowToast } from "../../redux/uiActions/todo";
import Toast from "./Toast";

function mapStateToProps(state, ownProps) {
  const toastProperty = state?.toast?.toastProperty;
  return {
    toastProperty,
  };
}

function mapDispatchToProps(dispatch, props) {
  return bindActionCreators(
    {
      handleHideToast,
      handleShowToast,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Toast);
