import { Component } from 'react';
import { ImageGalery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { Modal } from './Modal/Modal';
import { Button } from './Button/Button';

const API = 'https://pixabay.com/api/?key=30615642-0c3410a518698d6d783d2cae0';
export class App extends Component {
  state = {
    items: [],
    isLoding: false,
    searchText: '',
    activeItem: null, 
    page: 1
  };

  onCloseModal = () => {
    this.setState({activeItem:null})
  }

  getApiQuery = () => {       
     fetch(`${API}&q=${this.state.searchText}&page=${this.state.page}`)
      .then(res => res.json())
      .then(resonse =>
       { console.log(resonse)
        this.setState({
          items: resonse.hits,
        })}
     )
      .catch(console.log("Error"))
      .finally(this.setState({ isLoding: false }));
  }

  componentDidUpdate(_, prevState) {    
    if (prevState.searchText !== this.state.searchText) {
      this.getApiQuery()
      console.log("Did Update")
    }
    if (prevState.page !== this.state.page) {
      this.getApiQuery()
    }
  }

  componentDidMount() {
    console.log("Did mount")
    this.setState({ isLoding: true });
    this.getApiQuery()  
  }

  onSubmit = searchText => {    
    this.setState({ searchText: searchText , page:1});
  };

  getActiveUrl = (item)=>{
    this.setState({activeItem: item})
  }

  nexPage = () => {
    this.setState(prevState => ({
      page: prevState.page + 1
    }))
  }

  render() {
    return (
      <div className="App">
        <Searchbar onSubmit={this.onSubmit} />
        <ImageGalery items={this.state.items} getActiveUrl={this.getActiveUrl} />
        {this.state.activeItem && <Modal activeItem={this.state.activeItem} onCloseModal={ this.onCloseModal} />}
        <Button nexPage={this.nexPage} />
      </div>
    );
  }
}
