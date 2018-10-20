<!--设置考核比例-->
<div class="baseinfo_wrap">
    <div class="modal_content ">
        <ul class="content_list">
            <li>
                <div class="fl half_width">
                    <label for="name">课程名称：</label>
                    <input type="text" id="name" v-model="course.name">
                </div>
                <div class="fr half_width">
                    <label for="credits">学分：</label>
                    <input type="number" id="credits" v-model="course.credits">分
                </div>
                <i class="fix"></i>
            </li>
            <li>
                <div class="fl half_width" style="width:100%;">
                    <label>课程分类：</label>
                    <select id="classifyId" name="classifyId"
                            class="base_select"  v-model="temp_sel_arr[0]" @change = "setInd(0)">
                        <option v-for="item in rows_courseCategory"
                                :value=item v-text="item.name">
                        </option>
                    </select>
                    <select  name="classifyId" class="base_select" v-model="temp_sel_arr[ind]"   v-for="(data,ind) in temp_sel_arr"  @change = "setInd(ind)" v-if="ind>0 && temp_sel_arr[ind-1]['subCateogries']&&temp_sel_arr[ind-1]['subCateogries'].length>0">
                        <option v-for="item in temp_sel_arr[ind-1]['subCateogries']" :value=item v-text="item.name">
                        </option>
                    </select>
                </div>
                <i class="fix"></i>
            </li>
            <li>
                <div class="fl half_width">
                    <label for="code">课程编号：</label>
                    <input type="text" id="code" v-model="course.code">
                </div>
                <div class="fr half_width">
                    <label for="teacherName">讲师姓名：</label>
                    <input type="text" id="teacherName" v-model="course.teacherName">
                </div>
                <i class="fix"></i>
            </li>
            <li>
                <div class="fl half_width">
                    <label>课程来源：</label>
                    <span class="radio_wrap">
                        <input name="sourceType" type="radio" class="fl" value="0"
                               v-model="course.sourceType"> 本系统
                    </span>
                    <span class="radio_wrap">
                        <input name="sourceType" type="radio" class="fl" value="1"
                               v-model="course.sourceType"> 第三方系统
                    </span>
                </div>
                <div class="fr half_width">
                    <div v-if="course.sourceType==1">
                        <label for="sourceUrl">三方链接：</label>
                        <input type="text" id="sourceUrl"
                               v-model="course.sourceUrl"/>
                    </div>
                </div>
                <i class="fix"></i>
            </li>
            <li>
                <div class="fl half_width">
                    <label>课程类型：</label>
                    <span class="radio_wrap">
                        <input type="radio" name="type" class="fl" value="1"
                               v-model="course.type">开放课程
                    </span>
                    <span class="radio_wrap">
                        <input type="radio" name="type" class="fl" value="2"
                               v-model="course.type">收费课程
                    </span>
                    <span class="radio_wrap">
                        <input type="radio" name="type" class="fl" value="3"
                               v-model="course.type">内部课程
                    </span>
                </div>
                <div class="fr half_width">
                    <div v-if="course.type==2">
                        <label for="price">价格：</label>
                        <input type="number" id="price"
                               v-model="course.price"/>元
                    </div>
                </div>
                <i class="fix"></i>
            </li>
            <li v-if="course.type==2">
                <div class="fl half_width">
                    <label>是否试看：</label>
                    <span class="radio_wrap">
                        <input name="sfsk" type="radio" class="fl" value="0"
                               v-model="course.sfsk"> 可以试看
                    </span>
                    <span class="radio_wrap">
                        <input name="sfsk" type="radio" class="fl" value="1"
                               v-model="course.sfsk"> 不可试看
                    </span>
                </div>
                <div class="fr half_width">
                    <div v-if="course.sfsk == 0">
                        <label for="sksj">试看时间：</label>
                        <input type="number" id="sksj" class="sksj" placeholder="请输入试看时间（分钟）">
                    </div>
                </div>
            </li>
            <li>
                <div class="fl half_width">
                    <label for="difficulty">难度：</label>
                    <input type="text" id="difficulty" v-model="course.difficulty"
                           placeholder="请输入课程难度">
                </div>
                <div class="fr half_width">
                    <label for="language">语言：</label>
                    <input type="text" id="language" v-model="course.language"
                           placeholder="请输入课程语言">
                </div>
                <i class="fix"></i>
            </li>
            <li>
                <div class="fl half_width">
                    <label>学习类型：</label>
                    <span class="radio_wrap">
                        <input name="studyStyle" type="radio" class="fl" value="0"
                               v-model="course.studyStyle"> 线上
                    </span>
                    <span class="radio_wrap">
                        <input name="studyStyle" type="radio" class="fl" value="1"
                               v-model="course.studyStyle"> 线下
                    </span>
                </div>
            </li>

            <li>
                <textarea name="profile" id="profile" class="baseinfo_sub" v-model="course.profile"
                          placeholder="请输入课程描述"></textarea>
            </li>
        </ul>
        <div class="btn_wrap">
            <button class="btn cancel_btn" @click="closeModal('baseinfo')">取消</button>
            <button class="btn confirm_btn" @click="submitCourseInfo">确定</button>
        </div>
    </div>
</div>