import { useEffect, useState } from "react";
import { Edit, Trash2, Mail, Award, BookOpen, Eye } from "lucide-react";
import { useLecturer } from "../../hooks/useLecturer";
import Button from "@/foundation/components/buttons/Button";
import Empty from "@/foundation/components/empty/Empty";
import ModalConfirm from "@/foundation/components/modal/ModalConfirm";
import EditLecturer from "../edit/EditLecturer";
import { dataLecturer } from "@/core/api/lecturer/types";
import LecturerSkeleton from "@/foundation/components/loading/LecturerSkeleton";
import { ReduxStateType } from "@/app/store/types";
import Pagination from "@/features/posts/components/list-post/Pagination";
import { useNavigate } from "react-router-dom";
export default function ListLecturer() {
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, _setPageSize] = useState(4);
  const {
    lecturer,
    getLecturers,
    deleteLecturer,
    idDelete,
    isDeleteLecturer,
    isEditLecturer,
    handleChangeDeleteLecturer,
    statusGetLecturer,
    handleChangeIdDeleteLecturer,
    handleChangeEditLecturer,
  } = useLecturer();
  const [lecturerEdit, setLecturerEdit] = useState<dataLecturer>();

  const handleEdit = (lecturer: dataLecturer) => {
    handleChangeEditLecturer(true);
    setLecturerEdit(lecturer);
  };
  const navigate = useNavigate();

  const handleDeleteClick = (lecturer: any) => {
    handleChangeIdDeleteLecturer(lecturer.id);
    handleChangeDeleteLecturer(true);
  };

  const stripHtml = (html: string) => {
    return html.replace(/<[^>]*>/g, "").trim();
  };

  useEffect(() => {
    getLecturers();
  }, []);
  if (statusGetLecturer === ReduxStateType.LOADING) {
    return <LecturerSkeleton />;
  }

  // Calculate pagination
  const totalPages = Math.ceil(lecturer.length / pageSize);
  const startIndex = currentPage * pageSize;
  const endIndex = startIndex + pageSize;
  const currentLecturers = lecturer.slice(startIndex, endIndex);

  return (
    <div className="min-h-screen p-6 bg-background-base">
      <div className="mx-auto max-w-7xl">
        {/* Lecturer Cards */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {currentLecturers.map((lecturer) => (
            <div
              key={lecturer.id}
              className="overflow-hidden transition-all duration-300 transform shadow-lg bg-background-elevated rounded-2xl hover:shadow-2xl hover:-translate-y-2"
            >
              {/* Card Header */}
              <div className="p-6 text-white bg-gradient-to-r from-primary to-secondary">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-32 h-32 rounded-full bg-primary-foreground">
                    {lecturer.filePath && (
                      <img
                        src={`${import.meta.env.VITE_API_URL_FILE}/${lecturer.filePath}`}
                        alt={lecturer.name}
                        className="object-cover w-full h-full rounded-full"
                      />
                    )}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{lecturer.name}</h3>
                    <p className="text-blue-100">{lecturer.title}</p>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 space-y-4">
                <div className="flex items-center space-x-3 text-gray-600">
                  <Mail size={18} className="text-blue-500" />
                  <span className="text-sm">{lecturer.email}</span>
                </div>

                <div className="space-y-2">
                  <div className="flex items-start space-x-3">
                    <BookOpen size={18} className="mt-1 text-green-500" />
                    <div>
                      <p className="font-semibold text-gray-800">
                        Chuyên ngành
                      </p>
                      <p className="text-sm text-gray-600">
                        {lecturer.majorName}
                      </p>
                      <p className="text-xs text-gray-500">
                        {lecturer.subMajorName}
                      </p>
                    </div>
                  </div>
                </div>

                {stripHtml(lecturer.position) && (
                  <div className="p-3 rounded-lg bg-gray-50">
                    <p className="text-sm text-gray-700">
                      <span className="font-semibold">Vị trí: </span>
                      {stripHtml(lecturer.position)}
                    </p>
                  </div>
                )}

                {stripHtml(lecturer.researchInterests) && (
                  <div className="space-y-2">
                    <p className="flex items-center font-semibold text-gray-800">
                      <Award size={16} className="mr-2 text-yellow-500" />
                      Lĩnh vực nghiên cứu
                    </p>
                    <div className="p-3 text-sm text-gray-600 rounded-lg bg-yellow-50">
                      {stripHtml(lecturer.researchInterests).substring(0, 100)}
                      {stripHtml(lecturer.researchInterests).length > 100 &&
                        "..."}
                    </div>
                  </div>
                )}
              </div>

              {/* Card Footer */}
              <div className="flex px-6 py-3 pb-6 space-x-3 border-t border-border-primary">
                <Button
                  onClick={() => handleEdit(lecturer)}
                  variant="success"
                  size="small"
                  iconLeft={<Edit size={18} className="text-white" />}
                />
                <Button
                  onClick={() => handleDeleteClick(lecturer)}
                  variant="danger"
                  size="small"
                  iconLeft={<Trash2 size={18} className="text-white" />}
                />
                <Button
                  onClick={() => navigate(`/lecturers/${lecturer.id}`)}
                  variant="gradientCool"
                  size="small"
                  iconLeft={<Eye size={18} className="text-white" />}
                />
              </div>
            </div>
          ))}
        </div>

        {lecturer.length === 0 && (
          <Empty
            title="Không có giảng viên"
            description="Vui lòng thêm giảng viên"
          />
        )}
      </div>
      {isDeleteLecturer && (
        <ModalConfirm
          isOpen={isDeleteLecturer}
          onClose={() => handleChangeDeleteLecturer(false)}
          onConfirm={() => deleteLecturer(idDelete as number)}
          title="Xóa giảng viên"
          message="Bạn có chắc chắn muốn xóa giảng viên này không?"
          confirmText="Xóa"
          cancelText="Hủy"
        />
      )}
      {isEditLecturer && (
        <EditLecturer lecturer={lecturerEdit as dataLecturer} />
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={lecturer.length}
        pageSize={pageSize}
        onPageChange={(page: number) => {
          setCurrentPage(page);
        }}
      />
    </div>
  );
}
