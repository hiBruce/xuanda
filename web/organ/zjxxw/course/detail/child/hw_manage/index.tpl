<div class="hwmange_wrap">
	<div class="content_list hwmanage_list">
		<div class="search_wrap ">
			<div class="input_wrap fl">
				<input type="text" placeholder="请输入作业名称" v-model="inputName" id="searchName">
				<i class="iconfont" @click="getList(1)">&#xe600;</i>
			</div>
			<div class="btn-group">
				<select name="" id="" class="form-control" v-model="zyzt">
					<option value="2">全部</option>
					<option value="0">未完成</option>
					<option value="1">已完成</option>
				</select>
				<!-- <button type="button" id="zyzt" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
					请选择作业状态<span class="caret"></span>
				</button>
				<ul class="dropdown-menu">
					<li ><a value="2" href="###" @click="changeValue($event,'zyzt')">全部</a></li>
					<li ><a value="0" href="###" @click="changeValue($event,'zyzt')">未完成</a></li>
					<li ><a value="1" href="###" @click="changeValue($event,'zyzt')">已完成</a></li>
				</ul> -->
			</div>
			<!-- <div class="btn-group">
				select.
				<button type="button" id="zymc" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
					请选择作业名称<span class="caret"></span>
				</button>
				<ul class="dropdown-menu">
					<li ><a value="" href="###" @click="changeValue($event,'zymc')">全部</a></li>
					<li v-for="mc in zyMcList"><a href="###" @click="changeValue($event,'zymc')" :value="mc" v-html="mc"></a></li>
				</ul>
			</div> -->
			<button class="btn search_btn" @click="searchFun">查询</button>
		</div>
		<ul class="subject_list" v-if="zyList.length>0" v-cloak>
			<li class="title">
				<span class="col-lg-3">作业名称</span>
				<span class="col-lg-3">所属课程</span>
				<span class="col-lg-2">提交时间</span>
				<span class="col-lg-1">学员名称</span>
				<span class="col-lg-1">作业状态</span>
				<span class="col-lg-2">操作</span>
			</li>
			<li v-for="zy in zyList" class="row">
				<span class="col-lg-3 ">
					<i class="limittext" v-text="zy.zymc"></i>
				</span>
				<span class="col-lg-3  " >
					<i class="limittext" v-text="zy.kcmc"></i>
				</span>
				<span class="col-lg-2  " v-if="!zy.tjsj">
					<i class="limittext"  v-text="zy.tjsj"></i>
				</span>
				<span class="col-lg-2  " v-else >
					<i class="limittext"  ></i>
				</span>
				<span class="col-lg-1 " v-text="zy.xyxm"></span>
				<span class="col-lg-1 " v-if="zy.zyzt==0">未完成</span>
				<span class="col-lg-1 " v-else="zy.zyzt==1">已完成</span>
				<span class="col-lg-2 ">
					<button class="btn edit_btn" @click="demoShow(zy)" v-if="zy.pjzt==0&&zy.zyzt==1">填写点评</button>
					<button class="btn edit_btn" @click="demoShow(zy)" v-if="zy.pjzt==1">查看点评</button>
					<button class="btn del_btn" @click="deleteConfirm(zy)">删除</button>
				</span>
			</li>
		</ul>
		<ul v-else>
			<div class="nodata-warp">
				<p>暂无数据</p>
			</div>
		</ul>
	</div>
	<div class="hwmanagement_page"></div>
</div>