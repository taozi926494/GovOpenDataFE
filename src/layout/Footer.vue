<template>
  <footer>
    <div class="footer-section footer-sysname">
      <span class="footer-sysname-cn">政府开放数据中心</span>
      <i>GOVERNMENT OPEN DATA CENTER</i>
    </div>

    <div class="footer-section">
      <div class="affirm">
        <span>©2020 中电科大数据研究院有限公司-共性技术研究中心</span>
      </div>

      <div class="contact-method">
        <span>电话: 0851-88636666</span>
        <span>邮编: 550022</span>
        <span>地址: 贵州省贵阳市国家高新区长岭南路160号高科一号C座29层</span>
      </div>

      <div class="link">
        <span>友情链接：</span>
        <span>
          <a href="http://www.cetc.com.cn" target="_blank">中国电科</a>
        </span>
        <span>
          <a href="http://www.bigdata.cetc.com.cn" target="_blank">中电科大数据研究院</a>
        </span>
        <span>
          <a href="http://www.gyopendata.gov.cn/city/index.htm" target="_blank">贵阳市政府开放平台</a>
        </span>
        <span>
          <a href="http://www.cddata.gov.cn/odweb/index.htm" target="_blank">成都市公共数据平台</a>
        </span>
      </div>
    </div>
  </footer>
</template>
<style lang="scss">
$footerColor: #8c919f;
footer {
  width: 100%;
  padding: 15px 150px;
  display: flex;
  background-color: #2d2f42;
  color: $footerColor;
  font-family: "微软雅黑";
  font-size: 12px;

  .link {
    a {
      text-decoration: none;
      color: $footerColor;
    }
    a:hover {
      color: #4698ff;
    }
  }
}
.footer-section {
  display: flex;
  flex-direction: column;
  text-align: left;

  span {
    display: inline-block;
    margin: 2px;
  }
}
.footer-sysname {
  padding-right: 40px;
  margin-right: 40px;
  text-align: right;
  border-right: 1px solid $footerColor;
  color: #e6e6e6;

  &-cn {
    @include font-title-big;
  }
}
</style>>
