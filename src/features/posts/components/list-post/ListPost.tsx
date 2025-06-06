import Empty from "@/foundation/components/empty/Empty";

import { usePost } from "../../hooks/usePost";
import { useEffect, useState } from "react";
import UniversalGridManager from "@/foundation/components/list-posts/UniversalGridManager";
import { useNavigate } from "react-router-dom";
import { IRequestSearchArticle } from "@/core/api/posts/types";
import FilterPanel from "./FilterPanel";
import Pagination from "./Pagination";
import {
  setIdDeletePost,
  setIsDeletePost,
  setIsEditPost,
  setIsEditPostId,
} from "../../slice/posts.slice";
import { useDispatch } from "react-redux";
import ModalConfirm from "@/foundation/components/modal/ModalConfirm";

const ListPost = () => {
  const {
    posts,
    handleGetArticle,
    isDeletePost,
    handleDeletePost,
    deletePostData,
  } = usePost();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [filter, setFilter] = useState<IRequestSearchArticle>({
    page: 1,
    size: 9,
    categoryId: null,
    subCategoryId: null,
    status: null,
    isPrivate: null,
    tag: null,
    sort: null,
    order: null,
    keyword: null,
  });

  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    handleGetArticle(filter);
  }, [filter]);

  const handleSearch = () => {
    setFilter((prev) => ({ ...prev, page: 1 }));
  };

  const handleReset = () => {
    handleGetArticle(filter);
  };

  const handlePageChange = (page: number) => {
    setFilter((prev) => ({ ...prev, page }));
  };

  const postsData = posts.content;
  const totalPages = posts.totalPages;
  const totalItems = posts.totalItems;
  console.log(postsData, totalPages, totalItems);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex gap-3">
          <button
            onClick={() => setShowFilter(!showFilter)}
            className="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            {showFilter ? "Ẩn bộ lọc" : "Hiện bộ lọc"}
          </button>
        </div>
      </div>

      {/* Filter Panel */}
      {showFilter && (
        <FilterPanel
          filter={filter}
          setFilter={setFilter}
          onSearch={handleSearch}
          onReset={handleReset}
        />
      )}

      {/* Posts Grid */}
      <div className="">
        <UniversalGridManager
          data={postsData}
          emptyMessage={<Empty />}
          cardConfig={{
            showImage: true,
            showBadge: true,
            showMetadata: true,
            showActions: true,
            imageKey: "thumbnailUrl",
            titleKey: "title",
            descriptionKey: "description",
            badgeKey: "status",
          }}
          onEdit={(item) => {
            dispatch(setIsEditPost(true));
            dispatch(setIsEditPostId(item));
          }}
          onDelete={(item) => {
            dispatch(setIsDeletePost(true));
            dispatch(setIdDeletePost(item.id));
          }}
          onView={(item) => navigate(`/posts/${item.id}`)}
        />
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={filter.page}
        totalPages={totalPages || 10}
        totalItems={totalItems || 0}
        pageSize={filter.size}
        onPageChange={handlePageChange}
      />
      {isDeletePost && (
        <ModalConfirm
          isOpen={isDeletePost}
          onClose={() => dispatch(setIsDeletePost(false))}
          onConfirm={() => {
            handleDeletePost(deletePostData.id);
          }}
        />
      )}
    </div>
  );
};

export default ListPost;
