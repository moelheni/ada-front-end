import React, { Component } from 'react'

import { connect } from 'react-redux';

import {
  applyVoucherCode
} from '../../actions'

class VoucherCodeUpdater extends Component{
  applyVoucherCodeHandler(){
    this.props.applyVoucherCode(this.voucherCode.value)
  }
  render(){
    return(
      <div className="floating-box voucher-box">
        {
          this.props.profile.appliedVoucherCode &&
          <div className="alert alert-success">
            Voucher Code applied
          </div>
        }
        {
          this.props.profile.appliedVoucherCode === false &&
          <div className="alert alert-warning">
            {
              this.props.profile.appliedVoucherCodeError
            }
          </div>
        }
        <div>
          <input type="text"
                 placeholder="Voucher Code"
                 className="form-control"
                 ref={ (input) => this.voucherCode = input } />
          <button
               onClick={ () => this.applyVoucherCodeHandler() }
               className="btn btn-success">Apply</button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    profile: state.profil
  }
}

const mapDispatchToProps = dispatch => {
  return {
    applyVoucherCode: (voucherCode) => {
      dispatch(applyVoucherCode(voucherCode))
    }
  }
}

const VoucherCodeUpdaterContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(VoucherCodeUpdater)


export default VoucherCodeUpdaterContainer
