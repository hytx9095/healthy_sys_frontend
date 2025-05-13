declare namespace API {
  type AssistantDialogue = {
    content?: string;
    createTime?: string;
    id?: number;
    isDelete?: number;
    operationTime?: string;
    spokesman?: string;
    status?: number;
    userId?: number;
  };

  type AssistantDialogueDeleteDTO = {
    dialogueId?: number;
  };

  type AssistantDialogueDTO = {
    content?: string;
  };

  type AssistantDialogueQueryDTO = {
    current?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    userId?: number;
  };

  type AssistantDialogueRegenerateDTO = {
    answerId?: number;
    questionId?: number;
  };

  type BasicHealthInfo = {
    age?: number;
    bloodPressure?: string;
    bmi?: number;
    bodyTemperature?: number;
    createTime?: string;
    gender?: string;
    heartRate?: number;
    height?: number;
    id?: number;
    isDelete?: number;
    leftEyeVision?: number;
    operationTime?: string;
    rightEyeVision?: number;
    userId?: number;
    vitalCapacity?: number;
    weight?: number;
  };

  type BasicHealthInfoDTO = {
    age?: number;
    bloodPressure?: string;
    bmi?: number;
    bodyTemperature?: number;
    gender?: string;
    heartRate?: number;
    height?: number;
    leftEyeVision?: number;
    rightEyeVision?: number;
    vitalCapacity?: number;
    weight?: number;
  };

  type CommonDeleteDTO = {
    id?: number;
  };

  type deleteQuestionUsingDELETEParams = {
    /** questionId */
    questionId: string;
  };

  type deleteTestPaperUsingDELETEParams = {
    /** testPaperId */
    testPaperId: string;
  };

  type DietInfo = {
    createTime?: string;
    food?: string;
    happenTime?: string;
    id?: number;
    isDelete?: number;
    operationTime?: string;
    type?: number;
    userId?: number;
  };

  type DietInfoDTO = {
    food?: string;
    happenTime?: string;
    type?: number;
  };

  type DietInfoQueryDTO = {
    current?: number;
    food?: string;
    happenTime?: string;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    type?: number;
  };

  type DietInfoUpdateDTO = {
    dietId?: number;
    food?: string;
    happenTime?: string;
    type?: number;
  };

  type DiseaseInfo = {
    createTime?: string;
    description?: string;
    diseaseName?: string;
    happenTime?: string;
    id?: number;
    isDelete?: number;
    operationTime?: string;
    type?: number;
    userId?: number;
  };

  type DiseaseInfoDTO = {
    description?: string;
    diseaseName?: string;
    happenTime?: string;
    type?: number;
  };

  type DiseaseInfoQueryDTO = {
    current?: number;
    diseaseName?: string;
    happenTime?: string;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    type?: number;
  };

  type DiseaseInfoUpdateDTO = {
    description?: string;
    diseaseInfoId?: number;
    diseaseName?: string;
    happenTime?: string;
    type?: number;
  };

  type DoctorApplyDTO = true;

  type DoctorContact = {
    doctorAvatar?: string;
    doctorId?: number;
    doctorName?: string;
    lastMessage?: string;
    lastTime?: string;
    unread?: number;
  };

  type DoctorDialogueDeleteDTO = {
    dialogueId?: number;
  };

  type DoctorDialogueDTO = {
    content?: string;
    doctorId?: number;
    userId?: number;
  };

  type DoctorDialogueQueryDTO = {
    current?: number;
    currentRole?: string;
    doctorId?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    userId?: number;
  };

  type DoctorDialogueRegenerateDTO = {
    answerId?: number;
    questionId?: number;
  };

  type DoctorDialogueVO = {
    content?: string;
    createTime?: string;
    doctorAvatar?: string;
    doctorId?: number;
    doctorName?: string;
    id?: number;
    isDelete?: number;
    operationTime?: string;
    spokesman?: string;
    status?: number;
    userId?: number;
  };

  type DoctorInfo = {
    createTime?: string;
    description?: string;
    evidence?: string;
    id?: number;
    isDelete?: number;
    operationTime?: string;
    status?: number;
    type?: string;
    userId?: number;
  };

  type DoctorInfoDTO = {
    description?: string;
    evidence?: string;
    type?: string;
  };

  type DoctorInfoExamineDTO = {
    description?: string;
    doctorInfoId?: number;
    result?: string;
  };

  type DoctorInfoQueryDTO = {
    current?: number;
    description?: string;
    doctorName?: string;
    evidence?: string;
    pageSize?: number;
    searchCondition?: string;
    sortField?: string;
    sortOrder?: string;
    type?: string;
  };

  type DoctorInfoUpdateDTO = {
    description?: string;
    doctorId?: number;
    evidence?: string;
    type?: string;
  };

  type DoctorInfoVO = {
    createTime?: string;
    description?: string;
    evidence?: string;
    id?: number;
    status?: number;
    type?: string;
    userAvatar?: string;
    userId?: number;
    username?: string;
  };

  type getDietInfoUsingGETParams = {
    /** dietInfoId */
    dietInfoId: number;
  };

  type getDiseaseInfoUsingGETParams = {
    /** DiseaseInfoId */
    DiseaseInfoId: number;
  };

  type GetDoctorInfoDTO = {
    current?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    userId?: number;
  };

  type getDoctorInfoUsingGETParams = {
    /** doctorInfoId */
    doctorInfoId: number;
  };

  type getHealthyNewsUsingGETParams = {
    /** healthyNewsId */
    healthyNewsId: number;
  };

  type getQuestionUsingGETParams = {
    /** questionId */
    questionId: number;
  };

  type getSportInfoUsingGETParams = {
    /** sportInfoId */
    sportInfoId: number;
  };

  type getTestPaperUsingGETParams = {
    /** testPaperId */
    testPaperId: number;
  };

  type GetUserVODTO = {
    userId?: number;
  };

  type HealthyKnowledge = {
    content?: string;
    createTime?: string;
    id?: number;
    isDelete?: number;
    operationTime?: string;
    status?: number;
    tags?: string;
    type?: number;
    userId?: number;
  };

  type HealthyKnowledgeDeleteDTO = {
    id?: number;
  };

  type HealthyKnowledgeDTO = {
    content?: string;
    healthyKnowledgeId?: number;
    tags?: string;
    type?: number;
  };

  type HealthyKnowledgeExamineDTO = {
    description?: string;
    healthyKnowledgeId?: number;
    result?: string;
    userId?: number;
  };

  type HealthyKnowledgeListDTO = {
    healthyKnowledgeDTOS?: HealthyKnowledgeDTO[];
  };

  type HealthyKnowledgeQueryDTO = {
    content?: string;
    current?: number;
    pageSize?: number;
    searchCondition?: string;
    sortField?: string;
    sortOrder?: string;
    status?: number;
    tags?: string;
    type?: number;
    userId?: number;
  };

  type HealthyKnowledgeStarDTO = {
    healthyKnowledgeId?: number;
  };

  type HealthyKnowledgeVO = {
    content?: string;
    createTime?: string;
    id?: number;
    isStarred?: number;
    status?: number;
    tags?: string;
    type?: number;
    userAvatar?: string;
    userId?: number;
    username?: string;
  };

  type HealthyNews = {
    content?: string;
    createTime?: string;
    id?: number;
    isDelete?: number;
    isHome?: number;
    operationTime?: string;
    userId?: number;
  };

  type HealthyNewsDTO = {
    content?: string;
    isHome?: number;
  };

  type HealthyNewsQueryDTO = {
    content?: string;
    current?: number;
    isHome?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
  };

  type HealthyNewsUpdateDTO = {
    content?: string;
    id?: number;
    isHome?: number;
  };

  type HealthyNewsVO = {
    content?: string;
    id?: number;
    isHome?: number;
    userAvatar?: string;
    username?: string;
  };

  type IPageDoctorInfoVO_ = {
    current?: number;
    pages?: number;
    records?: DoctorInfoVO[];
    size?: number;
    total?: number;
  };

  type IPageHealthyKnowledgeVO_ = {
    current?: number;
    pages?: number;
    records?: HealthyKnowledgeVO[];
    size?: number;
    total?: number;
  };

  type IPageMessageVO_ = {
    current?: number;
    pages?: number;
    records?: MessageVO[];
    size?: number;
    total?: number;
  };

  type LoginVO = {
    createTime?: string;
    email?: string;
    id?: number;
    isDelete?: number;
    operationTime?: string;
    role?: string;
    telephone?: string;
    token?: string;
    userAccount?: string;
    userAvatar?: string;
    username?: string;
  };

  type MessageDeleteDTO = {
    id?: number;
    messageType?: string;
  };

  type MessageDTO = {
    content?: string;
    id?: number;
    messageType?: string;
    publishTime?: string;
    status?: number;
    userId?: number;
  };

  type MessageQueryDTO = {
    content?: string;
    current?: number;
    pageSize?: number;
    searchCondition?: string;
    sortField?: string;
    sortOrder?: string;
    status?: number;
    userId?: number;
  };

  type MessageVO = {
    content?: string;
    createTime?: string;
    id?: number;
    messageType?: string;
    publishTime?: string;
    status?: number;
    userId?: number;
  };

  type OrderItem = {
    asc?: boolean;
    column?: string;
  };

  type PageAssistantDialogue_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: AssistantDialogue[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageDietInfo_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: DietInfo[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageDiseaseInfo_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: DiseaseInfo[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageDoctorDialogueVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: DoctorDialogueVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageHealthyKnowledgeVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: HealthyKnowledgeVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageHealthyNewsVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: HealthyNewsVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageQuestion_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: Question[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageRiskPrediction_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: RiskPrediction[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageSportInfo_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: SportInfo[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageSuggestion_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: Suggestion[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageTestPaper_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: TestPaper[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageUser_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: User[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type passHealthyKnowledgeUsingPOSTParams = {
    /** healthyKnowledgeId */
    healthyKnowledgeId: number;
  };

  type Question = {
    answer?: string;
    createTime?: string;
    id?: number;
    isDelete?: number;
    operationTime?: string;
    tags?: string;
    title?: string;
    type?: number;
    userId?: number;
    wrongAnswers?: string;
  };

  type QuestionDTO = {
    answer?: string;
    tags?: string;
    title?: string;
    type?: number;
    wrongAnswers?: string[];
  };

  type QuestionListDTO = {
    questionList?: QuestionDTO[];
  };

  type QuestionQueryDTO = {
    answer?: string;
    current?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    tags?: string;
    title?: string;
    type?: number;
  };

  type R = {
    code?: number;
    data?: Record<string, any>;
    msg?: string;
  };

  type RBasicHealthInfo_ = {
    code?: number;
    data?: BasicHealthInfo;
    msg?: string;
  };

  type RBoolean_ = {
    code?: number;
    data?: boolean;
    msg?: string;
  };

  type RDietInfo_ = {
    code?: number;
    data?: DietInfo;
    msg?: string;
  };

  type RDiseaseInfo_ = {
    code?: number;
    data?: DiseaseInfo;
    msg?: string;
  };

  type RDoctorInfo_ = {
    code?: number;
    data?: DoctorInfo;
    msg?: string;
  };

  type RHealthyKnowledge_ = {
    code?: number;
    data?: HealthyKnowledge;
    msg?: string;
  };

  type RHealthyNews_ = {
    code?: number;
    data?: HealthyNews;
    msg?: string;
  };

  type RIPageDoctorInfoVO_ = {
    code?: number;
    data?: IPageDoctorInfoVO_;
    msg?: string;
  };

  type RIPageHealthyKnowledgeVO_ = {
    code?: number;
    data?: IPageHealthyKnowledgeVO_;
    msg?: string;
  };

  type RIPageMessageVO_ = {
    code?: number;
    data?: IPageMessageVO_;
    msg?: string;
  };

  type RiskPrediction = {
    content?: string;
    createTime?: string;
    id?: number;
    isDelete?: number;
    isRead?: number;
    operationTime?: string;
    title?: string;
    userId?: number;
  };

  type RiskPredictionDTO = {
    content?: string;
    id?: number;
    isRead?: number;
    title?: string;
    userId?: number;
  };

  type RiskPredictionQueryDTO = {
    current?: number;
    isRead?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
  };

  type RListDoctorContact_ = {
    code?: number;
    data?: DoctorContact[];
    msg?: string;
  };

  type RListHealthyKnowledgeVO_ = {
    code?: number;
    data?: HealthyKnowledgeVO[];
    msg?: string;
  };

  type RListUserContact_ = {
    code?: number;
    data?: UserContact[];
    msg?: string;
  };

  type RListUserVO_ = {
    code?: number;
    data?: UserVO[];
    msg?: string;
  };

  type RLoginVO_ = {
    code?: number;
    data?: LoginVO;
    msg?: string;
  };

  type RMessageVO_ = {
    code?: number;
    data?: MessageVO;
    msg?: string;
  };

  type RPageAssistantDialogue_ = {
    code?: number;
    data?: PageAssistantDialogue_;
    msg?: string;
  };

  type RPageDietInfo_ = {
    code?: number;
    data?: PageDietInfo_;
    msg?: string;
  };

  type RPageDiseaseInfo_ = {
    code?: number;
    data?: PageDiseaseInfo_;
    msg?: string;
  };

  type RPageDoctorDialogueVO_ = {
    code?: number;
    data?: PageDoctorDialogueVO_;
    msg?: string;
  };

  type RPageHealthyKnowledgeVO_ = {
    code?: number;
    data?: PageHealthyKnowledgeVO_;
    msg?: string;
  };

  type RPageHealthyNewsVO_ = {
    code?: number;
    data?: PageHealthyNewsVO_;
    msg?: string;
  };

  type RPageQuestion_ = {
    code?: number;
    data?: PageQuestion_;
    msg?: string;
  };

  type RPageRiskPrediction_ = {
    code?: number;
    data?: PageRiskPrediction_;
    msg?: string;
  };

  type RPageSportInfo_ = {
    code?: number;
    data?: PageSportInfo_;
    msg?: string;
  };

  type RPageSuggestion_ = {
    code?: number;
    data?: PageSuggestion_;
    msg?: string;
  };

  type RPageTestPaper_ = {
    code?: number;
    data?: PageTestPaper_;
    msg?: string;
  };

  type RPageUser_ = {
    code?: number;
    data?: PageUser_;
    msg?: string;
  };

  type RQuestion_ = {
    code?: number;
    data?: Question;
    msg?: string;
  };

  type RRiskPrediction_ = {
    code?: number;
    data?: RiskPrediction;
    msg?: string;
  };

  type RSportInfo_ = {
    code?: number;
    data?: SportInfo;
    msg?: string;
  };

  type RTestPaper_ = {
    code?: number;
    data?: TestPaper;
    msg?: string;
  };

  type RUserVO_ = {
    code?: number;
    data?: UserVO;
    msg?: string;
  };

  type SportInfo = {
    content?: string;
    createTime?: string;
    id?: number;
    isDelete?: number;
    occurrenceTime?: string;
    operationTime?: string;
    userId?: number;
  };

  type SportInfoDTO = {
    content?: string;
    occurrenceTime?: string;
  };

  type SportInfoQueryDTO = {
    content?: string;
    current?: number;
    occurrenceTime?: string;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
  };

  type SportInfoUpdateDTO = {
    content?: string;
    occurrenceTime?: string;
    sportInfoId?: number;
  };

  type Suggestion = {
    content?: string;
    createTime?: string;
    id?: number;
    isDelete?: number;
    isRead?: number;
    operationTime?: string;
    title?: string;
    userId?: number;
  };

  type SuggestionDTO = {
    content?: string;
    id?: number;
    isRead?: number;
    title?: string;
    userId?: number;
  };

  type SuggestionQueryDTO = {
    current?: number;
    isRead?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
  };

  type TestPaper = {
    answer?: string;
    createTime?: string;
    id?: number;
    isDelete?: number;
    operationTime?: string;
    questions?: string;
    score?: number;
    userAnswer?: string;
    userId?: number;
  };

  type TestPaperDTO = {
    teatPaperId?: number;
    userAnswer?: Record<string, any>;
  };

  type TestPaperQueryDTO = {
    current?: number;
    pageSize?: number;
    score?: number;
    sortField?: string;
    sortOrder?: string;
    teatPaperId?: number;
  };

  type User = {
    createTime?: string;
    email?: string;
    id?: number;
    isDelete?: number;
    operationTime?: string;
    role?: string;
    telephone?: string;
    userAccount?: string;
    userAvatar?: string;
    userPassword?: string;
    username?: string;
  };

  type UserChangePasswordDTO = {
    confirmPassword?: string;
    newPassword?: string;
    oldPassword?: string;
  };

  type UserContact = {
    lastMessage?: string;
    lastTime?: string;
    unread?: number;
    userAvatar?: string;
    userId?: number;
    username?: string;
  };

  type UserFindPasswordDTO = {
    email?: string;
  };

  type UserLoginFormDTO = {
    userAccount?: string;
    userPassword?: string;
  };

  type UserQueryDTO = {
    current?: number;
    pageSize?: number;
    role?: string;
    sortField?: string;
    sortOrder?: string;
    username?: string;
  };

  type UserRegisterDTO = {
    checkPassword?: string;
    userAccount?: string;
    userPassword?: string;
  };

  type UserUpdateDTO = {
    email?: string;
    telephone?: string;
    userAvatar?: string;
    username?: string;
  };

  type UserUpdateRoleDTO = {
    role?: string;
    userId?: number;
  };

  type UserVO = {
    createTime?: string;
    email?: string;
    id?: number;
    role?: string;
    telephone?: string;
    userAccount?: string;
    userAvatar?: string;
    username?: string;
  };
}
