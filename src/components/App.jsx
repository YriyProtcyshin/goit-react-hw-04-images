import { Component } from 'react';
import { ImageGalery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { Modal } from './Modal/Modal';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';

// import { Audio } from 'react-loader-spinner';

const API = 'https://pixabay.com/api/?key=30615642-0c3410a518698d6d783d2cae0';
export class App extends Component {
  state = {
    items: [],
    activeItem: null,
    status: 'blank',
    isLoding: false,
    searchText: '',
    page: 1,
  };

  onCloseModal = () => {
    this.setState({ activeItem: null });
  };

  getApiQuery = () => {
    this.setState({ status: 'pending' });

    fetch(`${API}&q=${this.state.searchText}&page=${this.state.page}`)
      .then(res => res.json())
      .then(data =>
        this.setState(prevState => ({
          items: [...prevState.items, ...data.hits],
          status: 'resolve',
        }))
      );

    // setTimeout(() => {
    //   fetch(`${API}&q=${this.state.searchText}&page=${this.state.page}`)
    //     .then(res => res.json())
    //     .then(data =>
    //       this.setState(prevState => ({
    //         items: [...prevState.items, ...data.hits],
    //         status: 'resolve',
    //       }))
    //     );
    // }, 1000);
  };

  componentDidUpdate(_, prevState) {
    if (prevState.searchText !== this.state.searchText) {
      this.getApiQuery();
    }
    if (prevState.page !== this.state.page) {
      this.getApiQuery();
    }
  }
  onSubmit = searchText => {
    this.setState({ searchText: searchText, page: 1, items: [] });
  };

  getActiveUrl = item => {
    this.setState({ activeItem: item });
  };

  nexPage = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { items, status, activeItem } = this.state;
    return (
      <div className="App">
        <Searchbar onSubmit={this.onSubmit} />

        {items.length > 0 && (
          <ImageGalery
            items={this.state.items}
            getActiveUrl={this.getActiveUrl}
          />
        )}

        {status === 'pending' && <Loader />}
        {status === 'resolve' && <Button nexPage={this.nexPage} />}

        {activeItem && (
          <Modal
            activeItem={this.state.activeItem}
            onCloseModal={this.onCloseModal}
          />
        )}
      </div>

      // <div className="App">
      //   <Searchbar onSubmit={this.onSubmit} />
      //   <ImageGalery
      //     items={this.state.items}
      //     getActiveUrl={this.getActiveUrl}
      //   />
      //   {this.state.activeItem && (
      //     <Modal
      //       activeItem={this.state.activeItem}
      //       onCloseModal={this.onCloseModal}
      //     />
      //   )}

      //   <Loader isLoding={this.state.isLoding} />
      //   <Button nexPage={this.nexPage} />
      // </div>
    );
  }
}
