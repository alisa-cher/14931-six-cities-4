import React from "react";

// TOASK: 1. зачем тут форма, если нет запроса на сервер?
// 2. принцип сортировки хранить в стейте редакса? это ведь бизнес-логика?

//изнчально выбран попюлар - отображается в порядке, выданном сервером
//нужен локальный стейт - для открытого закрытого состояния

class SortingOptions extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isOpened: false,
    };
    this._setActiveCard = this._setActiveCard.bind(this);
  }

  _setActiveCard(card) {
    this.setState(() => {
      return {detailedOffer: card};
    });
  }

  render() {
    const isOpened = this.state.isOpened;
    const {activeSorting} = this.props;

    return (<form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex="0"> Popular
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"/>
        </svg>
      </span>
      <ul className="places__options places__options--custom places__options--closed">
        <li className="places__option places__option--active" tabIndex="0">Popular</li>
        <li className="places__option" tabIndex="0">Price: low to high</li>
        <li className="places__option" tabIndex="0">Price: high to low</li>
        <li className="places__option" tabIndex="0">Top rated first</li>
      </ul>

      {/*<select className="places__sorting-type" id="places-sorting">*/}
      {/*  <option className="places__option" value="popular" selected="">Popular</option>*/}
      {/*  <option className="places__option" value="to-high">Price: low to high</option>*/}
      {/*  <option className="places__option" value="to-low">Price: high to low</option>*/}
      {/*  <option className="places__option" value="top-rated">Top rated first</option>*/}
      {/*</select>*/}
    </form>
    );
  }
}


export default SortingOptions;
