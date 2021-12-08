
export const getStoredFavoriteUsers = () => {

    if(localStorage.getItem("favoriteUsersList")){
        console.log('local ' + localStorage.getItem("favoriteUsersList"));
        return JSON.parse(localStorage.getItem("favoriteUsersList"));
    }
    return [];

}
    
