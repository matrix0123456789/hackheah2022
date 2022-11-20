import {ref, computed} from 'vue'
import {defineStore} from 'pinia'

export const useNavigatorStore = defineStore('navigator', () => {
    const _pages = {
        home: "home",
        gamesList: "gamesList",
        game: "game"
    }

    let _currentPage = _pages.home;

    const currentPage = computed(() => _currentPage )
    const pages = computed(() => _pages )

    function goToPage(page) {
        if(pages[page]){
            _currentPage = page
        }
    }

    return {currentPage,  pages, goToPage}
})
