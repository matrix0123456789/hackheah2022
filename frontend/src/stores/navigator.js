import {ref, computed, reactive} from 'vue'
import {defineStore} from 'pinia'

export const useNavigatorStore = defineStore('navigator', () => {
    const _pages = {
        home: "home",
        gamesList: "gamesList",
        game: "game"
    }

    let _currentPage = ref(_pages.home);

    const currentPage = computed(() => _currentPage.value )
    const pages = computed(() => _pages )

    function goToPage(page) {
        console.log("goToPage", page);

        if(_pages[page]){
            _currentPage.value = page
        }
    }

    return {currentPage,  pages, goToPage}
})
