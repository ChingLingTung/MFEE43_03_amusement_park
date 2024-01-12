import React from 'react'
import { useContext, useState } from 'react'
import SearchCategory from '@/component/ride/search_category'
import SearchSupport from '@/component/ride/search_support'
import SearchTheme from '@/component/ride/search_theme'
import SearchThillerRating from '@/component/ride/search_thiller_rating'

// 宣告要使用的context
import { createContext } from 'react'
const SearchContext = createContext("")

export function SearchProvider({ children }) {
  const [searchCategory,setSearchCategory]=useState(0)
  const [searchTheme,setSearchTheme]=useState(0)
  const [searchThillerRating,setSearchThillerRating]=useState(0)
  const [searchSupport,setSearchSupport]=useState(0)

  return (
    <SearchContext.Provider
      value={{
        searchCategory,
        searchTheme,
        searchThillerRating,
        searchSupport,
      }}
    >
    {/* <div className={styles.search_flex} style={{height:50}}>
      <SearchTheme  />
      <SearchCategory  />
    </div>
    <div className={styles.search_flex} style={{height:50}}>
      <SearchThillerRating />
      <SearchSupport />
    </div> */}
      {children}
    </SearchContext.Provider>
  )
}

export default function useSearch() {
  return useContext(SearchContext)
}
