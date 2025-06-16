import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useLecturer } from "../../hooks/useLecturer";
import LoadingSpinner from "@/foundation/components/loading/LoadingSpinner";
import { ReduxStateType } from "@/app/store/types";
import {
  ArrowLeft,
  Mail,
  Award,
  GraduationCap,
  User,
  FileText,
  Target,
  Lightbulb,
  Trophy,
} from "lucide-react";

import Button from "@/foundation/components/buttons/Button";
import { stripHtml } from "@/shared/utils/stripHtml";

const DetailLecturer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getDetailLecturer, statusGetDetailLecturer, detailLecturer } =
    useLecturer();

  useEffect(() => {
    if (id) {
      getDetailLecturer(Number(id));
    }
  }, [id]);

  const handleBack = () => {
    navigate(-1);
  };
  const handleSendMail = (mail: string) => {
    const subject = encodeURIComponent("Yêu cầu hỗ trợ từ sinh viên");
    const body = encodeURIComponent(
      `Xin chào Thầy/Cô,\n\n` +
        `Em là sinh viên đang tìm hiểu thông tin liên quan đến chuyên ngành hoặc môn học mà Thầy/Cô phụ trách. ` +
        `Em rất mong muốn được Thầy/Cô hỗ trợ hoặc tư vấn thêm.\n\n` +
        `Trân trọng cảm ơn Thầy/Cô!\n` +
        `Sinh viên`
    );
    // Tạo URL mở Gmail
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${mail}&su=${subject}&body=${body}`;

    // Mở Gmail trong tab mớis
    window.open(gmailUrl, "_blank");
  };

  if (statusGetDetailLecturer === ReduxStateType.LOADING) {
    return (
      <div className="flex items-center justify-center h-screen bg-background-base">
        <div className="text-center animate-fade-in">
          <div className="relative">
            <LoadingSpinner />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-y-auto rounded-lg ">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute rounded-full -top-40 -right-40 w-96 h-96 bg-background-overlay blur-3xl animate-pulse"></div>
        <div
          className="absolute rounded-full -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-indigo-200/20 to-pink-200/20 blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute transform -translate-x-1/2 -translate-y-1/2 rounded-full top-1/2 left-1/2 w-80 h-80 bg-gradient-to-br from-emerald-200/10 to-cyan-200/10 blur-3xl animate-pulse"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      {/* Main Content */}
      <div className="relative p-2 mx-auto sm:px-3 sm:py-5 md:px-4 md:py-8 lg:px-6 lg:py-12 max-w-7xl">
        <div className="p-2">
          <Button
            variant="borderIce"
            onClick={handleBack}
            iconLeft={<ArrowLeft className="w-4 h-4" />}
          >
            Quay lại
          </Button>
        </div>
        {/* Hero Section with 50-50 Layout */}
        <div className="p-2 mb-8 overflow-hidden transition-all duration-700 rounded-lg shadow-2xl sm:mb-12 md:mb-16 bg-background-overlay backdrop-blur-xl sm:rounded-xl md:rounded-2xl lg:rounded-3xl hover:shadow-3xl hover:bg-background-overlay animate-fade-in sm:px-3 sm:py-5 md:px-4 md:py-8 lg:px-6 lg:py-12">
          <div className="flex flex-col lg:flex-row">
            {/* Left Side - Image (50%) */}
            <div className="relative lg:w-1/2">
              <div className="relative h-60 sm:h-80 md:h-96 lg:h-[400px] xl:h-[600px] overflow-hidden bg-background-overlay rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-3xl">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-32 h-32 rounded-bl-full bg-gradient-to-br from-white/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 rounded-tr-full bg-gradient-to-tr from-white/20 to-transparent"></div>

                {detailLecturer?.filePath ? (
                  <img
                    src={`${import.meta.env.VITE_API_URL_FILE}/${detailLecturer.filePath}`}
                    alt={detailLecturer.name}
                    className="object-cover w-full h-full transition-all duration-700 hover:scale-110"
                  />
                ) : (
                  <div className="flex items-center justify-center w-full h-full">
                    <User className="w-32 h-32 text-blue-600/50" />
                  </div>
                )}

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>

                {/* Bottom info overlay */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="p-4 shadow-lg bg-white/90 backdrop-blur-sm rounded-2xl">
                    <h4 className="mb-1 text-sm font-semibold text-gray-800">
                      Chuyên ngành
                    </h4>
                    <p className="text-lg font-bold text-blue-600">
                      {detailLecturer?.majorName}
                      {detailLecturer?.subMajorName && (
                        <span className="block mt-1 text-sm font-medium text-gray-600">
                          {detailLecturer.subMajorName}
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Info (50%) */}
            <div className="relative p-2 sm:px-3 sm:py-5 md:px-4 md:py-8 lg:px-6 lg:py-12 lg:w-1/2">
              {/* Background decorations */}
              <div className="absolute top-0 right-0 w-20 h-20 translate-x-10 -translate-y-10 rounded-full opacity-50 bg-gradient-to-br from-blue-100 to-indigo-100"></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 -translate-x-8 translate-y-8 rounded-full opacity-50 bg-gradient-to-br from-purple-100 to-pink-100"></div>

              <div className="relative z-10 flex flex-col h-full">
                {/* Title Section */}
                <div className="mb-8">
                  <h3 className="mb-4 text-xl font-bold leading-tight text-transparent sm:text-2xl md:text-3xl lg:text-4xl lg:text-5xl bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 bg-clip-text">
                    {detailLecturer?.name}
                  </h3>

                  <div className="flex flex-wrap gap-3 mb-4">
                    <div className="inline-flex items-center gap-2 px-4 py-2 text-sm font-bold text-white transition-all duration-300 transform shadow-lg bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl hover:scale-105 hover:shadow-xl sm:text-base md:text-lg">
                      <GraduationCap className="w-5 h-5" />
                      {detailLecturer?.title}
                    </div>

                    {detailLecturer?.position && (
                      <div className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-purple-700 transition-all duration-300 transform bg-purple-100 rounded-2xl hover:scale-105 hover:bg-purple-200 sm:text-sm md:text-base">
                        <Award className="w-4 h-4" />
                        {stripHtml(detailLecturer.position)}
                      </div>
                    )}
                  </div>
                </div>

                {/* Quick Info Cards */}
                <div className="flex-1 mb-4 space-y-4">
                  {detailLecturer?.email && (
                    <div className="flex items-center gap-4 p-4 text-xs transition-all duration-300 group bg-white/60 backdrop-blur-sm rounded-2xl hover:bg-blue-50 hover:scale-105 hover:shadow-lg sm:text-sm md:text-base">
                      <div className="p-3 transition-all duration-300 bg-blue-100 rounded-xl group-hover:bg-blue-200 group-hover:scale-110">
                        <Mail className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-600 sm:text-sm">
                          Email liên hệ
                        </p>
                        <a
                          href={`mailto:${detailLecturer.email}`}
                          className="text-sm font-bold text-blue-600 transition-colors duration-300 sm:text-base hover:text-blue-800 hover:underline"
                        >
                          {detailLecturer.email}
                        </a>
                      </div>
                    </div>
                  )}

                  {/* Quick Bio Preview */}
                  {detailLecturer?.bio && (
                    <div className="p-2 transition-all duration-300 border-4 border-gray-200 border-dashed rounded-lg sm:px-3 sm:py-5 md:px-4 md:py-8 lg:px-6 lg:py-12 bg-gradient-to-br from-gray-50/80 to-blue-50/80 sm:rounded-xl md:rounded-2xl lg:rounded-3xl hover:border-blue-300 hover:bg-gradient-to-br hover:from-blue-50/80 hover:to-indigo-50/80">
                      <h4 className="flex items-center gap-2 mb-3 text-xs font-bold text-gray-800 sm:text-sm">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                        Giới thiệu nhanh
                      </h4>
                      <p
                        className="text-xs leading-relaxed text-gray-700 sm:text-sm line-clamp-4"
                        dangerouslySetInnerHTML={{
                          __html: detailLecturer.bio,
                        }}
                      ></p>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div
                  className="flex gap-4"
                  onClick={() => handleSendMail(detailLecturer?.email || "")}
                >
                  <button className="flex items-center justify-center flex-1 gap-3 px-6 py-4 font-bold text-white transition-all duration-300 transform bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 hover:scale-105 hover:shadow-2xl active:scale-95">
                    <Mail className="w-5 h-5" />
                    Liên hệ ngay
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Information Sections */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Bio */}
          {detailLecturer?.bio && (
            <div className="group lg:col-span-2 p-2 sm:px-3 sm:py-5 md:px-4 md:py-8 lg:px-6 lg:py-12 bg-background-overlay backdrop-blur-xl border border-white/30 shadow-xl rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-3xl transition-all duration-500 hover:bg-background-muted hover:shadow-2xl hover:scale-[1.01] animate-fade-in">
              <div className="absolute inset-0 transition-opacity duration-500 rounded-lg opacity-0 bg-gradient-to-br from-purple-500/3 to-pink-500/3 sm:rounded-xl md:rounded-2xl lg:rounded-3xl group-hover:opacity-100"></div>
              <h3 className="relative flex items-center gap-4 mb-8 text-lg font-bold sm:text-xl md:text-2xl lg:text-3xl text-text-primary">
                <div className="p-4 shadow-lg bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl">
                  <User className="w-8 h-8 text-white" />
                </div>
                Thông tin cá nhân
                <div className="flex-1 h-px bg-gradient-to-r from-background-subtle to-transparent"></div>
              </h3>
              <div className="relative p-2 border-2 rounded-lg shadow-inner sm:px-3 sm:py-5 md:px-4 md:py-8 lg:px-6 lg:py-12 bg-gradient-to-br from-purple-50/50 to-pink-50/50 sm:rounded-xl md:rounded-2xl lg:rounded-3xl border-purple-200/30">
                <p
                  className="text-sm font-medium leading-relaxed text-gray-700 whitespace-pre-line sm:text-base"
                  dangerouslySetInnerHTML={{
                    __html: detailLecturer.bio,
                  }}
                ></p>
              </div>
            </div>
          )}

          {/* Education */}
          {detailLecturer?.education && (
            <div className="group p-2 sm:px-3 sm:py-5 md:px-4 md:py-8 lg:px-6 lg:py-12 bg-background-overlay backdrop-blur-xl border border-white/30 shadow-xl rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-3xl transition-all duration-500 hover:bg-background-muted hover:shadow-2xl hover:scale-[1.02] animate-fade-in">
              <h3 className="flex items-center gap-4 mb-6 text-base font-bold sm:text-lg md:text-xl text-text-primary">
                <div className="p-3 shadow-lg bg-gradient-to-br from-secondary to-secondary-dark rounded-2xl">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                Học vấn
              </h3>
              <div className="p-2 border-2 rounded-lg shadow-inner sm:px-3 sm:py-5 md:px-4 md:py-8 lg:px-6 lg:py-12 bg-gradient-to-br from-background-surface to-background-elevated sm:rounded-xl md:rounded-2xl lg:rounded-3xl border-border-primary">
                <p
                  className="text-sm font-medium leading-relaxed sm:text-base text-text-secondary"
                  dangerouslySetInnerHTML={{
                    __html: detailLecturer.education,
                  }}
                ></p>
              </div>
            </div>
          )}

          {/* Research Interests */}
          {detailLecturer?.researchInterests && (
            <div className="group p-2 sm:px-3 sm:py-5 md:px-4 md:py-8 lg:px-6 lg:py-12 bg-background-overlay backdrop-blur-xl border border-white/30 shadow-xl rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-3xl transition-all duration-500 hover:bg-background-muted hover:shadow-2xl hover:scale-[1.02] animate-fade-in">
              <h3 className="flex items-center gap-4 mb-6 text-base font-bold sm:text-lg md:text-xl text-text-primary">
                <div className="p-3 shadow-lg bg-gradient-to-br from-accent to-accent-dark rounded-2xl">
                  <Lightbulb className="w-6 h-6 text-white" />
                </div>
                Lĩnh vực nghiên cứu
              </h3>
              <div className="p-2 border-2 rounded-lg shadow-inner sm:px-3 sm:py-5 md:px-4 md:py-8 lg:px-6 lg:py-12 bg-gradient-to-br from-background-surface to-background-elevated sm:rounded-xl md:rounded-2xl lg:rounded-3xl border-border-primary">
                <p
                  className="text-sm font-medium leading-relaxed sm:text-base text-text-secondary"
                  dangerouslySetInnerHTML={{
                    __html: detailLecturer.researchInterests,
                  }}
                ></p>
              </div>
            </div>
          )}

          {/* Teaching Areas */}
          {detailLecturer?.teachingAreas && (
            <div className="group p-2 sm:px-3 sm:py-5 md:px-4 md:py-8 lg:px-6 lg:py-12 bg-background-overlay backdrop-blur-xl border border-white/30 shadow-xl rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-3xl transition-all duration-500 hover:bg-background-muted hover:shadow-2xl hover:scale-[1.02] animate-fade-in">
              <h3 className="flex items-center gap-4 mb-6 text-base font-bold sm:text-lg md:text-xl text-text-primary">
                <div className="p-3 shadow-lg bg-gradient-to-br from-success to-success rounded-2xl">
                  <Target className="w-6 h-6 text-white" />
                </div>
                Lĩnh vực giảng dạy
              </h3>
              <div className="p-2 border-2 rounded-lg shadow-inner sm:px-3 sm:py-5 md:px-4 md:py-8 lg:px-6 lg:py-12 bg-gradient-to-br from-background-surface to-background-elevated sm:rounded-xl md:rounded-2xl lg:rounded-3xl border-border-primary">
                <p className="text-sm font-medium leading-relaxed sm:text-base text-text-secondary">
                  {stripHtml(detailLecturer.teachingAreas)}
                </p>
              </div>
            </div>
          )}

          {/* Scientific Works */}
          {detailLecturer?.scientificWorks && (
            <div className="group p-2 sm:px-3 sm:py-5 md:px-4 md:py-8 lg:px-6 lg:py-12 bg-background-overlay backdrop-blur-xl border border-white/30 shadow-xl rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-3xl transition-all duration-500 hover:bg-background-muted hover:shadow-2xl hover:scale-[1.02] animate-fade-in">
              <h3 className="flex items-center gap-4 mb-6 text-base font-bold sm:text-lg md:text-xl text-text-primary">
                <div className="p-3 shadow-lg bg-gradient-to-br from-info to-info rounded-2xl">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                Công trình khoa học
              </h3>
              <div className="p-2 border-2 rounded-lg shadow-inner sm:px-3 sm:py-5 md:px-4 md:py-8 lg:px-6 lg:py-12 bg-gradient-to-br from-background-surface to-background-elevated sm:rounded-xl md:rounded-2xl lg:rounded-3xl border-border-primary">
                <p
                  className="text-sm font-medium leading-relaxed sm:text-base text-text-secondary"
                  dangerouslySetInnerHTML={{
                    __html: detailLecturer.scientificWorks,
                  }}
                ></p>
              </div>
            </div>
          )}

          {/* Awards */}
          {detailLecturer?.awards && (
            <div className="group lg:col-span-2 p-2 sm:px-3 sm:py-5 md:px-4 md:py-8 lg:px-6 lg:py-12 bg-background-overlay backdrop-blur-xl border border-white/30 shadow-xl rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-3xl transition-all duration-500 hover:bg-background-muted hover:shadow-2xl hover:scale-[1.01] animate-fade-in">
              <h3 className="flex items-center gap-4 mb-8 text-lg font-bold sm:text-xl md:text-2xl lg:text-3xl text-text-primary">
                <div className="p-4 shadow-lg bg-gradient-to-br from-warning to-warning rounded-2xl">
                  <Trophy className="w-8 h-8 text-white" />
                </div>
                Giải thưởng & Danh hiệu
                <div className="flex-1 h-px bg-gradient-to-r from-background-subtle to-transparent"></div>
              </h3>
              <div className="p-2 border-2 rounded-lg shadow-inner sm:px-3 sm:py-5 md:px-4 md:py-8 lg:px-6 lg:py-12 bg-gradient-to-br from-background-surface to-background-elevated sm:rounded-xl md:rounded-2xl lg:rounded-3xl border-border-primary">
                <p
                  className="text-sm font-semibold leading-relaxed sm:text-base text-text-secondary"
                  dangerouslySetInnerHTML={{
                    __html: detailLecturer.awards,
                  }}
                ></p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailLecturer;
