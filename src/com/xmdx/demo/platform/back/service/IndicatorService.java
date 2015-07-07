package com.xmdx.demo.platform.back.service;

import com.alibaba.fastjson.JSONObject;
import com.e9rj.platform.common.GenID;
import com.e9rj.platform.common.services.BusinessServices;
import com.xmzy.frameext.business.service.annotate.Service;
import com.xmzy.frameext.json.FastJsonUtil;
import com.xmzy.frameext.simpledb.DBDYDao;
import com.xmzy.frameext.simpledb.DBDYPO;
import com.xmzy.frameext.simpledb.DBDYPOUtil;
import com.xmzy.framework.context.ActionContext;
import org.apache.commons.lang.StringUtils;
import org.omg.CORBA.INV_IDENT;

import java.util.List;


@Service(name = "back.indicator")
public class IndicatorService extends BusinessServices {

    private final static String AUTH_FUNC_NO = "back.indicator";
    private final static String TABLE_NAME = "TB_INDICATOR";
    private final static String KEY_FIELD = "I_ID";

    @Override
    public int init(ActionContext actionContext) throws Exception {
        actionContext.setStringValue(CONST_FORMNAME, "com/xmdx/demo/back/indicator_main.html");
        return CONST_RESULT_SUCCESS;
    }

    @Override
    public int query(ActionContext actionContext) throws Exception {
        StringBuilder sql = new StringBuilder(String.format("SELECT * FROM %s I ", TABLE_NAME));
        String FIId = request.getParameter(KEY_FIELD);
        List<DBDYPO> pos = DBDYDao.selectBySQL2List(actionContext.getConnection(), sql.toString());
        String json = FastJsonUtil.dbdypoList2JsonString(pos);
        json = json.replaceAll("I_ID", "id");
        json = json.replaceAll("NAME", "name");
        json = json.replaceAll("P_ID", "pId");
        JSONObject jsonObject = JSONObject.parseObject(json);
        actionContext.getHttpResponse().getWriter().write(jsonObject.get("Rows").toString());
        return CONST_RESULT_AJAX;
    }

    @Override
    public int save(ActionContext actionContext) throws Exception {
        DBDYPO indicator = new DBDYPO(TABLE_NAME, KEY_FIELD, request);
        String IId = request.getParameter(KEY_FIELD);
        int result = 0;
        if (StringUtils.isNotBlank(IId)) {
            checkAuth(actionContext, AUTH_FUNC_NO, RIGHT_FOUR);
            result = DBDYDao.update(actionContext.getConnection(), indicator);

        } else {
            checkAuth(actionContext, AUTH_FUNC_NO, RIGHT_TWO);
            IId = GenID.genIdString("I", 21);
            indicator.set(KEY_FIELD, IId);
            result = DBDYDao.insert(actionContext.getConnection(), indicator);
        }
        if (result == 0) {
            setMessage(actionContext, "保存指标失败!");
        } else {
            setMessage(actionContext, "保存指标成功!");
        }
        return CONST_RESULT_AJAX;
    }

    @Override
    public int delete(ActionContext actionContext) throws Exception {
        checkAuth(actionContext, AUTH_FUNC_NO, RIGHT_EIGHT);
        String IIdStr = actionContext.getHttpRequest().getParameter("I_ID");
        int result;
        if (StringUtils.isNotBlank(IIdStr)) {
            String[] IIds = IIdStr.split(",");
            for (String IId : IIds) {
                if (StringUtils.isNotBlank(IId)) {
                    DBDYPO indicator = new DBDYPO(TABLE_NAME, KEY_FIELD);
                    indicator.set(KEY_FIELD, IId);
                    result = DBDYDao.delete(actionContext.getConnection(), indicator);
                    if (result == 0) {
                        setMessage(actionContext, "删除指标失败");
                        return CONST_RESULT_AJAX;
                    }
                }
            }
        }
        setMessage(actionContext, "删除指标成功");
        return CONST_RESULT_AJAX;
    }

    public int getSelectionItem(ActionContext actionContext) throws Exception {
        String IIDStr = request.getParameter("I_Id");
        String sql = String.format("select * from tb_indicator_selection where I_ID='%s'", IIDStr);
        List<DBDYPO> pos = DBDYDao.selectBySQL2List(actionContext.getConnection(), sql);
        String json = FastJsonUtil.dbdypoList2JsonString(pos);
        JSONObject jsonObject = JSONObject.parseObject(json);
        actionContext.getHttpResponse().getWriter().write(jsonObject.get("Rows").toString());
        return CONST_RESULT_AJAX;
    }


    public int saveSelectionItem(ActionContext actionContext) throws Exception {
        DBDYPO indicatorSelection = new DBDYPO("TB_INDICATOR_SELECTION", "IS_ID");
        String ISIdStr = actionContext.getHttpRequest().getParameter("IS_ID");
        String IIdStr = actionContext.getHttpRequest().getParameter("I_ID");
        String selectionName = actionContext.getHttpRequest().getParameter("selectionName");
        String selectionValue = actionContext.getHttpRequest().getParameter("selectionValue");
        int result;
        if (StringUtils.isNotBlank(ISIdStr)) {
            indicatorSelection.set("NAME", selectionName);
            indicatorSelection.set("VALUE", selectionValue);
            indicatorSelection.set("IS_ID", ISIdStr);
            result = DBDYDao.update(actionContext.getConnection(), indicatorSelection);
        } else {
            ISIdStr = GenID.genIdString("I", 21);
            indicatorSelection.set("NAME", selectionName);
            indicatorSelection.set("VALUE", selectionValue);
            indicatorSelection.set("IS_ID", ISIdStr);
            indicatorSelection.set("I_ID", IIdStr);
            result = DBDYDao.insert(actionContext.getConnection(), indicatorSelection);
        }
        if (result == 0) {
            setMessage(actionContext, "保存选项失败!");
        } else {
            setMessage(actionContext, "保存选项成功!");
        }
        return CONST_RESULT_AJAX;
    }

    public int delSelectionItem(ActionContext actionContext) throws Exception{
        String ISIDStr=request.getParameter("IS_ID");
        DBDYPO po=new DBDYPO("tb_indicator_selection","IS_ID");
        int result;
        po.set("IS_ID",ISIDStr);
        result=DBDYDao.delete(actionContext.getConnection(), po);
        if (result==1){
            setMessage(actionContext,"success");
        }
        return  CONST_RESULT_AJAX;
    }

    public int saveSetItem(ActionContext actionContext)throws Exception{
        String setName=request.getParameter("setName");
        String I_Id=request.getParameter("I_ID");
        String sql=String.format("select * from tb_indicator_set where I_ID='%s'", I_Id);
        List<DBDYPO>pos=DBDYDao.selectBySQL2List(actionContext.getConnection(), sql);
        int result;
        if (!pos.isEmpty()){
            DBDYPO po=pos.get(0);
            po.set("NAME",setName);
            po.set("I_ID",I_Id);
            result=DBDYDao.update(actionContext.getConnection(),po);
        }else{
            DBDYPO po=new DBDYPO("tb_indicator_set","ISST_ID");
            String ISSTIdStr = GenID.genIdString("I", 21);
            po.set("ISST_ID",ISSTIdStr);
            po.set("NAME",setName);
            po.set("I_ID",I_Id);
            result=DBDYDao.insert(actionContext.getConnection(),po);
        }
        if (result == 0) {
            setMessage(actionContext, "保存失败!");
        } else {
            setMessage(actionContext, "保存成功!");
        }
        return  CONST_RESULT_AJAX;
    }

    public  int getSetItem(ActionContext actionContext)throws Exception{
        String I_ID=request.getParameter("I_ID");
        String sql=String.format("select * from tb_indicator_set where I_ID='%s'",I_ID);
        List<DBDYPO> pos = DBDYDao.selectBySQL2List(actionContext.getConnection(), sql.toString());
        String json = FastJsonUtil.dbdypoList2JsonString(pos);
        JSONObject jsonObject = JSONObject.parseObject(json);
        actionContext.getHttpResponse().getWriter().write(jsonObject.get("Rows").toString());
        return CONST_RESULT_AJAX;
    }
    @Override
    public int goTo(ActionContext actionContext) throws Exception {
        return 0;
    }

    @Override
    public int insertExportData(ActionContext actionContext) throws Exception {
        return 0;
    }
}
