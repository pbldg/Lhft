package com.xmdx.demo.enterprise.back.service;

import com.alibaba.fastjson.JSONObject;
import com.e9rj.platform.common.GenID;
import com.e9rj.platform.common.services.BusinessServices;
import com.xmzy.frameext.business.service.annotate.Service;
import com.xmzy.frameext.json.FastJsonUtil;
import com.xmzy.frameext.simpledb.DBDYDao;
import com.xmzy.frameext.simpledb.DBDYPO;
import com.xmzy.framework.context.ActionContext;
import org.apache.commons.lang.StringUtils;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Administrator on 2015/6/30.
 */
@Service(name = "enterprise.iss")
public class IndicatorSetService extends BusinessServices {

    private final static String AUTH_FUNC_NO = "enterprise.iss";
    private final static String TABLE_NAME = "TB_INDICATOR";
    private final static String KEY_FIELD = "I_ID";

    @Override
    public int init(ActionContext actionContext) throws Exception {
        actionContext.setStringValue(CONST_FORMNAME, "com/xmdx/demo/back/indicator_set_main.html");
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

    public int getProblems(ActionContext actionContext)throws Exception{
        String I_ID=request.getParameter("I_ID");
        String sql=String.format("select * from tb_indicator where I_ID='%s'", I_ID);
        List<DBDYPO>pos=DBDYDao.selectBySQL2List(actionContext.getConnection(), sql);
        DBDYPO po=pos.get(0);
        int type=(Integer)po.get("TYPE");
        List<DBDYPO>fpos=new ArrayList<DBDYPO>();
        fpos.add(po);
        if (type==1){
            sql=String.format("select * from tb_indicator_selection where I_ID='%s'",I_ID);
            List<DBDYPO>ppos=DBDYDao.selectBySQL2List(actionContext.getConnection(),sql);
            fpos.addAll(ppos);
        }else if (type==2){
            sql=String.format("select * from tb_indicator_set where I_ID='%S'",I_ID);
            List<DBDYPO>ppos=DBDYDao.selectBySQL2List(actionContext.getConnection(),sql);
            fpos.addAll(ppos);
        }
        String json=FastJsonUtil.dbdypoList2JsonString(fpos);
        JSONObject jsonObject=JSONObject.parseObject(json);
        actionContext.getHttpResponse().getWriter().write(jsonObject.get("Rows").toString());
        return  CONST_RESULT_AJAX;
    }

    @Override
    public int save(ActionContext actionContext) throws Exception {
        return 0;
    }

    @Override
    public int delete(ActionContext actionContext) throws Exception {
        return 0;
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
