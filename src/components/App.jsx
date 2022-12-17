import { Component } from 'react';
import { ImageGalery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { Modal } from './Modal/Modal';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import ScrollToTop from 'react-scroll-to-top';

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
    totalPage: 1,
  };

  onCloseModal = () => {
    this.setState({ activeItem: null });
  };

  getApiQuery = () => {
    this.setState({ status: 'pending' });

    fetch(`${API}&q=${this.state.searchText}&page=${this.state.page}`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState(prevState => ({
          items: [...prevState.items, ...data.hits],
          status: 'resolve',
          totalPage: Math.ceil(data.totalHits / 20),
        }));
      });

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
    const { items, status, activeItem, searchText, page, totalPage } =
      this.state;
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
        {status === 'resolve' && items.length > 0 && page !== totalPage && (
          <Button nexPage={this.nexPage} />
        )}

        <ScrollToTop
          smooth
          color="#f50505"
          viewBox="0 0 27 27"
          svgPath="M25.172 15.172c0 0.531-0.219 1.031-0.578 1.406l-1.172 1.172c-0.375 0.375-0.891 0.594-1.422 0.594s-1.047-0.219-1.406-0.594l-4.594-4.578v11c0 1.125-0.938 1.828-2 1.828h-2c-1.062 0-2-0.703-2-1.828v-11l-4.594 4.578c-0.359 0.375-0.875 0.594-1.406 0.594s-1.047-0.219-1.406-0.594l-1.172-1.172c-0.375-0.375-0.594-0.875-0.594-1.406s0.219-1.047 0.594-1.422l10.172-10.172c0.359-0.375 0.875-0.578 1.406-0.578s1.047 0.203 1.422 0.578l10.172 10.172c0.359 0.375 0.578 0.891 0.578 1.422z"
        />

        {status === 'resolve' && items.length === 0 && (
          <p className="message">Nothing found for {searchText}</p>
        )}

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
