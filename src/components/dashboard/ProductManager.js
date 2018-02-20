import React, { Component } from 'react'
import { connect } from 'react-redux';

import {
  addProduct,
  updateProduct,
  deleteProduct
} from '../../actions'

class ProductManager extends Component{
  constructor(props){
    super(props)
    this.state = {
      newProduct: {
        progress: 0
      },
      showNewProduct: false,
      productToUpdate: {
        updating: false,
        id: null
      },
      image: null
    }
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside.bind(this));
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside.bind(this));
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.showNewProductForm()
    }
  }

  addProductHandler(){
    this.props.addProduct({
      name: this.state.newProduct.name,
      description: this.state.newProduct.description,
      githubUrl: this.state.newProduct.githubUrl,
      image: this.state.image
    })
    this.setState({
      showNewProduct: false
    })
  }

  updateProductHandler(){
    this.props.updateProduct(this.state.productToUpdate.id, {
      name: this.state.newProduct.name,
      description: this.state.newProduct.description,
      githubUrl: this.state.newProduct.githubUrl,
      image: this.state.image
    })
    this.setState({
      showNewProduct: false
    })
  }

  deleteProductHandler(id){
    this.props.deleteProduct(id)
  }

  changePicture(){
    var file = this.image.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.setState({
        image: reader.result
      })
    };
    reader.onerror =  (error) => {
      console.log('Error: ', error);
    };
  }


  showUpdater(product){
    let obj = { ...product }
    this.setState({
      showNewProduct: true,
      newProduct: obj,
      productToUpdate: {
        updating: true,
        id: obj.id
      },
      image: obj.image
    })
  }

  showNewProductForm(){
    this.setState({
      showNewProduct: !this.state.showNewProduct,
      newProduct: {
        progress: 0
      },
      productToUpdate: {
        updating: false,
        id: null
      },
      image: null
    })
  }

  render(){
    return <div className="floating-box no-padding product-box">
      <header>
        <h3>My Products</h3>
        <i className="fa fa-plus" onClick={ () => this.showNewProductForm() } />
      </header>
      {
        this.state.showNewProduct &&
        <div className="add-product-popup" ref={this.setWrapperRef.bind(this)}>
          <div className="form-group">
            <input
              value={this.state.newProduct.name}
              onChange={
                (e) => this.setState({newProduct: {...this.state.newProduct, name: e.target.value}})
              }
              placeholder="Name" className="form-control" />
          </div>

          <div className="form-group">
            <textarea
              value={this.state.newProduct.description}
              onChange={
                (e) => this.setState({newProduct: {...this.state.newProduct, description: e.target.value}})
              }
              placeholder="Description" className="form-control"></textarea>
          </div>
          <div className="form-group">
            <input
              value={this.state.newProduct.githubUrl}
              onChange={
                (e) => this.setState({newProduct: {...this.state.newProduct, githubUrl: e.target.value}})
              }
              placeholder="Github Url" className="form-control" />
          </div>
          <div className="form-group">
            <label>Thumbnail</label>
            <input onChange={() => this.changePicture()} ref={(input) => this.image = input } type="file" className="form-control" />
            {
              this.state.image &&
              <img src={this.state.image} className="thumb-picture" />
            }
          </div>
          {
            !this.state.productToUpdate.updating &&
            <div className="form-group">
              <button onClick={ () => this.addProductHandler()} className="btn btn-success">Add product</button>
            </div>
          }
          {
            this.state.productToUpdate.updating &&
            <div className="form-group">
              <button onClick={ () => this.updateProductHandler()} className="btn btn-success">Update product</button>
            </div>
          }
        </div>
      }

      <div className="box-content box-products">
        {
          this.props.products &&
          this.props.products.map( e => {
            return (
              <div className="item"
                style={{
                  backgroundImage: `url(/assets/products/${e.image})`
                }}
                onClick={
                  () => window.open(e.githubUrl)
                }
              >
                <div className="layer-black"></div>
                <div className="delete-project"
                  onClick={
                    (evt) => {
                      evt.preventDefault()
                      evt.stopPropagation()
                      this.deleteProductHandler(e.id)
                    }
                  }>
                  <i className="fa fa-times" />
                </div>

                <div className="update-project"
                  onClick={
                    (evt) => {
                      evt.preventDefault()
                      evt.stopPropagation()
                      this.showUpdater(e)
                    }
                  }>
                  <i className="fa fa-pencil" />
                </div>

                <div className="name-product">{e.name}</div>
                <div className="progress-product">{e.progress}%</div>
              </div>
            )
          })
        }
        {
          (!this.props.products || this.props.products.length == 0) &&
          <div>Add your first product</div>
        }
      </div>
    </div>
  }
}


const mapStateToProps = state => {
  return {
    products: state.products
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addProduct: product => {
      dispatch(addProduct(product))
    }, updateProduct: (id, product) => {
      dispatch(updateProduct(id, product))
    }, deleteProduct: id => {
      dispatch(deleteProduct(id))
    }
  }
}

const ProductManagerContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductManager)


export default ProductManagerContainer
