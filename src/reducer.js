export const initialState = {
    basket: [],
    user: null,
};

//Selector as a global function that maps through
//the basket and counts the total price
//initial value of the amount is 0

//putting the Selector inside reducer is a professional manner
export const getBasketTotal = (basket) => 
    basket?.reduce((amount, item) => item.price + amount, 0)

const reducer = (state, action) => {
    switch(action.type) {
        case 'ADD_TO_BASKET': 
            return {
                ...state,
                basket: [...state.basket, action.item]
            };

        case 'EMPTY_BASKET':
            return {
                ...state,
                basket: [...state.basket, action.item],
            };

        case 'REMOVE_FROM_BASKET': 
            const index = state.basket.findIndex(
                (basketItem) => basketItem.id === action.id
            );
            let newBasket = [...state.basket];

            //Splice function cuts the item that
            //matched the criteria in the findIndex function
            if(index >= 0) {
                newBasket.splice(index, 1);
            }

            return {
                ...state,
                basket: newBasket
            }

        //Here the user is persisted using the data layer 
        //using the dispatched info from the App component's listener
        case 'SET_USER':
            return {
                ...state,
                user: action.user
            }    

            default: 
            return state;
        }  

    }


export default reducer;