import "./ArticleText.scss"
import React, {useEffect, useState} from 'react'
import Article from "/src/components/articles/base/Article.jsx"
import AvatarView from "/src/components/generic/AvatarView.jsx"
import avarta from "../../assets/images/about-texts-image-1.png"

/**
 * @param {ArticleDataWrapper} dataWrapper
 * @param {Number} id
 * @return {JSX.Element}
 * @constructor
 */
function ArticleText({ dataWrapper, id }) {
    const [selectedItemCategoryId, setSelectedItemCategoryId] = useState(null)

    return (
        <Article id={dataWrapper.uniqueId}
                 type={Article.Types.SPACING_DEFAULT}
                 dataWrapper={dataWrapper}
                 className={`article-text`}
                 selectedItemCategoryId={selectedItemCategoryId}
                 setSelectedItemCategoryId={setSelectedItemCategoryId}>
            <ArticleTextItems dataWrapper={dataWrapper}
                              selectedItemCategoryId={selectedItemCategoryId}/>
        </Article>
    )
}

/**
 * @param {ArticleDataWrapper} dataWrapper
 * @param {String} selectedItemCategoryId
 * @return {JSX.Element}
 * @constructor
 */
function ArticleTextItems({ dataWrapper, selectedItemCategoryId }) {
    const filteredItems = dataWrapper.getOrderedItemsFilteredBy(selectedItemCategoryId)

    return (
        <div className={`article-text-items`}>
            {filteredItems.map((itemWrapper, key) => (
                <ArticleTextItem itemWrapper={itemWrapper} 
                                      key={key}/>
            ))}
        </div>
    )
}

/**
 * @param {ArticleItemDataWrapper} itemWrapper
 * @return {JSX.Element}
 * @constructor
 */
function ArticleTextItem({ itemWrapper }) {
    const positioningClass = itemWrapper.id % 2 === 0 ?
        `article-text-item-reverse` :
        ``

    return (
        <div className={`article-text-item articletextdiv ${positioningClass}`}>
            <div >
         
                            <img className={`article-text-avatar-view-wrapper articletextimg`}  src={avarta} alt="about avarta"/>            </div>

            <div className={`article-text-excerpt last-p-no-margin text-3`}
                 dangerouslySetInnerHTML={{__html: itemWrapper.locales.text || itemWrapper.placeholder}}/>
        </div>
    )
}

export default ArticleText
