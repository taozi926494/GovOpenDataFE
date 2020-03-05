<template>
	<div class="main" style="padding: 40px 0 40px 0;">
		<div class="t4_public t4_regBox">
			<div class="t4_regCons">
				<div class="t4_subReg" style="display: block;">
					<form action id="personalRegistForm" method="post">
						<div class="t4_Reg">
							<dl>
								<dt>
									<span class="t4_red">*</span>用户名:
								</dt>
								<dd>
									<input type="text" placeholder="请输入用户名" class="t4_Linp" name="username" id="username">
								</dd>
							</dl>
							<dl>
								<dt>
									<span class="t4_red">*</span>登录密码:
								</dt>
								<dd>
									<input type="password" placeholder="请输入密码" class="t4_Linp" name="password" id="password">
								</dd>
							</dl>
							<dl>
								<dt>
									<span class="t4_red">*</span>确认密码:
								</dt>
								<dd>
									<input type="password" placeholder="请再次输入密码" class="t4_Linp" name="confirmpassword" id="confirmpassword">
								</dd>
							</dl>
					</div>
					<div class="t4_line"></div>
					<div class="t4_Reg">
							<dl>
								<dt>
									<span class="t4_red">*</span>真实姓名: 
								</dt>
								<dd>
									<input type="text" name="realName" id="realName" placeholder="请输入真实姓名" class="t4_Linp">
								</dd>
							</dl>
							<dl>
								<dt>
									<span class="t4_red">*</span>身份证号: 
								</dt>
								<dd>
									<input type="text" name="ID_Number" id="ID_Number" placeholder="请输入身份证号" class="t4_Linp">
								</dd>
							</dl>
							<dl>
								<dt class="t4_phone">
									<span class="t4_red">*</span>手机号码: 
								</dt>
								<dd>
									<input type="text" name="phone" id="phone" placeholder="请输入手机号码" class="t4_Linp">
								</dd>
							</dl>
							<dl>
								<dt>
									<span class="t4_red">*</span>电子邮箱: 
								</dt>
								<dd>
									<input type="text" name="email" id="email" placeholder="请输入电子邮箱" class="t4_Linp">
								</dd>
							</dl>
							<dl>
								<dt>
									<span class="t4_red">*</span>职业: 
								</dt>
								<dd>
									<input type="text" name="email" id="email" placeholder="请输入您的职业" class="t4_Linp">
								</dd>
							</dl>
							<p>
								<input type="checkbox" value="agree" id="agree">
								<label for="agree">我已阅读并同意</label>
								<a>《全国政务数据开放中心数据开放授权协议》</a>
							</p>
							<dl style="padding: 0% 0% 0% 14%;">
								<dd>
									<button type="button" onclick="registeFrom()" class="t4_btn t4_regBtn">立即注册</button>
								</dd>
							</dl>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</template>

<style type="text/css">
.main{
	margin-top: 120px;
}
.t4_regBox{
	padding:0 0 60px 0; 
}
.t4_subReg{
	display:none;
}
.t4_Reg{
	width:570px; 
	position:relative; 
	margin:0 auto;
}
.t4_red{
	color:#ff3f3f; 
	padding:0 5px 0 0;
}

.t4_subReg dl{
	width:100%;
	padding:0 0 30px 0; 
	overflow:hidden;
}
.t4_subReg dl dt{
	width:150px; 
	line-height:43px; 
	text-align:right;  
	display:inline-block; 
	color:#5d7a9e; 
	font-size:16px;
}
.t4_subReg dl dt,.t4_subReg dl dd{
	float:left;
}
.t4_subReg dl.t4_phone dd{
	border:1px solid #d5e3f3;
}
.t4_subReg dl.t4_phone dd input{
	border:none;
}
.t4_subReg dl.t4_phone dd span{
	width:49px; 
	height:43px; 
	line-height:43px;  
	text-align:center; 
	display:inline-block; 
	border-right:1px solid #d5e3f3; 
	color:#c8ced6;
}
.t4_Reg .t4_Linp{
	width:414px;
	border-radius:0;
}
.t4_regBtn{
	width:414px; 
	float:right;
}
.t4_line{
	height:1px; 
	width:100%; 
	background:#d5e3f3; 
	margin:0 0 30px 0; 
	display:inline-block;
}
p {
    margin: 0;
    margin-bottom: 10px;
    margin-left: -180px;
    text-align: center;
}
.t4_Reg {
    width: 920px; margin-left: 230px;
}
.main{
	background:#eff3f7; 
	padding:0 0 185px 0;
}
.t4_public{
	width:1100px; 
	border:1px solid #d5e3f3; 
	background:#fff; 
	margin:0 auto; 
}
.t4_Linp{
	width:365px; 
	height:43px; 
	border:1px solid #d5e3f3; 
	border-radius:3px; 
	text-indent:13px; 
	color:#adb7c2; 
	font-size:16px;
}
.t4_Linp:focus{
	border:1px solid #52addd;
}
.t4_btn{
	width:365px; 
	height:48px; 
	line-height:48px; 
	background:#2b72c3; 
	color:#fff; 
	letter-spacing:8px; 
	padding:0 0 0 0px; 
	font-size:18px; 
	border:none; 
	border-radius:3px; 
	margin:0  auto;
}
.t4_regBtn{
	width:414px; 
	float:right;
}
button{
	cursor: pointer;
}
</style>