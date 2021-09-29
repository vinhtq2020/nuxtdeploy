
import Vuex from 'vuex'
import localStorage from '../plugins/localStorage';



const createStore = () => {
  return new Vuex.Store({
    state: {
      count: 0,
      booksInCart: [],
      totalMoney: 0,

      //search
      authorSelect: [],
      nxbSelect: [],


    },
    getters: {
      count(state) {
        return state.count;
      },
      value: state => {
        return state;
      },
      getBookQuatityInCartById: (state) => (id) => {
        console.log(state);
        if (state.booksInCart.filter(e => e.bookId === id).length > 0) {
          var bookIndex = state.booksInCart.findIndex((obj => obj.bookId == id));

          return state.booksInCart[bookIndex].quatity;
        }
        return 0;
      },
      // getBookInCartById:(state)=>(id)=>{
      //   var bookIndex = state.booksInCart.findIndex((obj => obj.bookId == id));
      //   return state.booksInCart[bookIndex];
      // }
      cart: (state) => {
        return state.booksInCart;
      },

      authorSelectSearch: (state) => {
        return state.authorSelect;
      },
      nxbSelectSearch: (state) => {
        return state.nxbSelect;
      }
    },
    mutations: {
      setCount(state) {
        state.count = 0;
      },
      setStateFromLocal(state) {
        var tmp = localStorage.get();
        if (tmp != 0) {
          state.booksInCart = tmp.booksInCart;
          state.count = tmp.count;
          state.totalMoney = tmp.totalMoney;
        } else {
          state.count = 0;
          state.booksInCart = [],
            state.totalMoney = 0
        }
      },
      increment(state) {
        state.count++
      },
      addToCart(state, payload) {
        console.log(state.booksInCart);
        if (state.booksInCart != null && state.booksInCart.filter(e => e.bookId === payload.bookId).length > 0) {
          var objIndex = state.booksInCart.findIndex((obj => obj.bookId == payload.bookId));

          state.booksInCart[objIndex] = {
            bookId: payload.bookId,
            bookName: payload.bookName,
            quatity: state.booksInCart[objIndex].quatity + payload.quatity,
            unitPrice: payload.unitPrice,
            // amount: payload.amount + state.booksInCart[objIndex].amount
          };
          state.count += payload.quatity;
          state.totalMoney += payload.amount;


        }
        else {
          state.booksInCart = [
            ...state.booksInCart,
            {
              bookId: payload.bookId,
              bookName: payload.bookName,
              quatity: payload.quatity,
              unitPrice: payload.unitPrice,
              // amount: payload.amount
            }
          ];
          state.count += payload.quatity;
          state.totalMoney += payload.amount;

        }
        console.log(state.booksInCart);
        localStorage.set({
          booksInCart: state.booksInCart,
          count: state.count,
          totalMoney: state.totalMoney
        });
      },
      increaseBookInCart(state, id) {
        let objIndex = state.booksInCart.findIndex((obj => obj.bookId == id));
        console.log("objIndex", objIndex);
        state.booksInCart[objIndex].quatity++;
        state.count++;
        state.totalMoney = parseInt(state.totalMoney) + parseInt(state.booksInCart[objIndex].unitPrice);
        localStorage.set({
          booksInCart: state.booksInCart,
          count: state.count,
          totalMoney: state.totalMoney
        });
      },
      decreaseBookInCart(state, id) {
        let objIndex = state.booksInCart.findIndex((obj => obj.bookId == id));

        state.booksInCart[objIndex].quatity--;
        state.count--;
        state.totalMoney = parseInt(state.totalMoney) - parseInt(state.booksInCart[objIndex].unitPrice);
        localStorage.set({
          booksInCart: state.booksInCart,
          count: state.count,
          totalMoney: state.totalMoney
        });
      },

      removeBookInCart(state, id) {
        let objIndex = state.booksInCart.findIndex((obj => obj.bookId == id));
        if (objIndex > -1) {
          state.count -= state.booksInCart[objIndex].quatity;
          state.totalMoney -= (state.booksInCart[objIndex].quatity * state.booksInCart[objIndex].unitPrice);
          console.log(state.totalMoney);
          state.booksInCart.splice(objIndex, 1);
          localStorage.set({
            booksInCart: state.booksInCart,
            count: state.count,
            totalMoney: state.totalMoney
          })
        }
      },

      setSearchFromUrl(state, array) {

        if (array.nxbSelect) {
          state.nxbSelect = array.nxbSelect;
        }
        if (array.authorSelect) {
          state.authorSelect = array.authorSelect;
        }
      }
    },


    actions: {
      increment({ commit }) {
        commit("increment");
      },
      addToCart({ commit }, payload) {
        commit("addToCart", payload)
      },
      setStateFromLocal({ commit }) {
        commit("setStateFromLocal");
      },
      increaseBookInCart({ commit }, id) {
        commit("increaseBookInCart", id);
      },
      decreaseBookInCart({ commit }, id) {
        commit("decreaseBookInCart", id);
      },
      removeBookInCart({ commit }, id) {
        commit("removeBookInCart", id);
      },
      setSearchFromUrl({ commit }, array) {
        commit("setSearchFromUrl", array);
      },
      setCount(vuexContext, count) {
        vuexContext.commit('setCount', count);
      }
    }
  })
}

export default createStore;